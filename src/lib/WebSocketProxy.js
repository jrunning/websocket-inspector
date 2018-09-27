import {
  wsEventClose,
  wsEventError,
  wsEventMessage,
  wsEventOpen,
  wsConstruct,
  wsClose,
  wsSend,
} from './redux/wsActions';

if (module.hot) {
  module.hot.decline();
}

const _WebSocket = WebSocket;
let registered;

function listenTo(webSocket, dispatch) {
  webSocket.addEventListener('close', e => dispatch(wsEventClose(webSocket, e)));
  webSocket.addEventListener('error', e => dispatch(wsEventError(webSocket, e)));
  webSocket.addEventListener('message', e => dispatch(wsEventMessage(webSocket, e)));
  webSocket.addEventListener('open', e => dispatch(wsEventOpen(webSocket, e)));
}

function wsProxy(_WebSocket, dispatch) {
  const handler = {
    construct(target, args) {
      const webSocket = new target(...args);
      dispatch(wsConstruct(webSocket, ...args));
      listenTo(webSocket, dispatch);
      return wsInstanceProxy(webSocket, dispatch);
    },
  };

  return new Proxy(_WebSocket, handler);
}

function wsInstanceProxy(webSocket, dispatch) {
  const handler = {
    get(target, propKey, receiver) {
      const origMethod = target[propKey];
      if (typeof origMethod !== 'function') {
        return origMethod;
      }

      switch (propKey) {
        case 'close':
          return function(code, reason) {
            dispatch(wsClose(target, code, reason));
            return origMethod.apply(target, arguments);
          };
        case 'send':
          return function(data) {
            dispatch(wsSend(target, data));
            return origMethod.apply(target, arguments);
          };
        default:
          return function() {
            return origMethod.apply(target, arguments);
          };
      }
    },
  };

  return new Proxy(webSocket, handler);
}

export function registerProxy(dispatch) {
  if (!registered) {
    registered = true;
    window.WebSocket = wsProxy(_WebSocket, dispatch);
  }
}
