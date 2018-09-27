import { addLast, mergeIn, updateIn, setIn } from 'timm';
import {
  WS_EVENT_CLOSE,
  WS_EVENT_ERROR,
  WS_EVENT_MESSAGE,
  WS_EVENT_OPEN,
  WS_CLOSE,
  WS_CONSTRUCT,
  WS_SEND,
} from './ActionTypes';
import { eventMethodClose, eventMethodConstruct, eventMethodSend } from '../models';

export function wsReducer(state, action) {
  switch (action.type) {
    case WS_EVENT_CLOSE:
    // fall through
    case WS_EVENT_ERROR:
    // fall through
    case WS_EVENT_MESSAGE:
    // fall through
    case WS_EVENT_OPEN:
      return handleWsEvent(state, action);
    case WS_CLOSE:
      return handleWsClose(state, action);
    case WS_CONSTRUCT:
      return handleWsConstruct(state, action);
    case WS_SEND:
      return handleWsSend(state, action);
    default:
      return state;
  }
}

function addEvent(state, webSocketId, event) {
  return updateIn(state, ['webSocketEvents', webSocketId], (events = []) => addLast(events, event));
}

function updateReadyState(state, { payload }) {
  const { webSocketId, readyState } = payload;
  return updateIn(
    state,
    ['webSockets', webSocketId, 'readyState'],
    (prevReadyState = WebSocket.CONNECTING) => Math.max(prevReadyState, readyState)
  );
}

function handleWsEvent(state, action) {
  return addEvent(
    updateReadyState(state, action),
    action.payload.webSocketId,
    action.payload.event
  );
}

function handleWsClose(state, action) {
  const { webSocketId, code, reason, timestamp, readyState } = action.payload;
  return addEvent(
    mergeIn(state, ['webSockets', webSocketId], { code, reason, readyState }),
    webSocketId,
    eventMethodClose(webSocketId, code, reason, timestamp)
  );
}

function handleWsConstruct(state, action) {
  const { webSocketId, timestamp } = action.payload;
  return addEvent(
    setIn(state, ['webSockets', webSocketId], action.payload),
    webSocketId,
    eventMethodConstruct(webSocketId, timestamp)
  );
}

function handleWsSend(state, action) {
  const { webSocketId, data, timestamp } = action.payload;
  return addEvent(
    updateReadyState(state, action),
    webSocketId,
    eventMethodSend(webSocketId, data, timestamp)
  );
}
