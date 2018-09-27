import {
  WS_EVENT_CLOSE,
  WS_EVENT_ERROR,
  WS_EVENT_MESSAGE,
  WS_EVENT_OPEN,
  WS_CONSTRUCT,
  WS_CLOSE,
  WS_SEND,
} from './ActionTypes';
import { eventWsClose, eventWsError, eventWsMessage, eventWsOpen } from '../models';

const webSocketIds = new WeakMap();
let wsCount = 0;

function getWebSocketId(webSocket) {
  if (webSocketIds.has(webSocket)) {
    return webSocketIds.get(webSocket);
  }
  const id = `${webSocket.url}:${++wsCount}`;
  webSocketIds.set(webSocket, id);
  return id;
}

export const wsEventClose = (webSocket, event) => {
  const webSocketId = getWebSocketId(webSocket);
  const { timeStamp: timestamp } = event;
  return {
    type: WS_EVENT_CLOSE,
    payload: {
      webSocketId,
      event: eventWsClose(webSocketId, event),
      readyState: webSocket.readyState,
      timestamp,
    },
  };
};

export const wsEventError = (webSocket, event) => {
  const webSocketId = getWebSocketId(webSocket);
  const { timeStamp: timestamp } = event;
  return {
    type: WS_EVENT_ERROR,
    payload: {
      webSocketId,
      event: eventWsError(webSocketId, event),
      readyState: webSocket.readyState,
      timestamp,
    },
  };
};

export const wsEventMessage = (webSocket, event) => {
  const webSocketId = getWebSocketId(webSocket);
  const { timeStamp: timestamp } = event;
  return {
    type: WS_EVENT_MESSAGE,
    payload: {
      webSocketId,
      event: eventWsMessage(webSocketId, event),
      readyState: webSocket.readyState,
      timestamp,
    },
  };
};

export const wsEventOpen = (webSocket, event) => {
  const webSocketId = getWebSocketId(webSocket);
  const { timeStamp: timestamp } = event;
  return {
    type: WS_EVENT_OPEN,
    payload: {
      webSocketId,
      event: eventWsOpen(webSocketId, event),
      readyState: webSocket.readyState,
      timestamp,
    },
  };
};

export const wsConstruct = (webSocket, url, protocols) => ({
  type: WS_CONSTRUCT,
  payload: {
    webSocketId: getWebSocketId(webSocket),
    url: url,
    protocols,
    readyState: webSocket.readyState,
    timestamp: performance.now(),
  },
});

export function wsClose(webSocket, code, reason) {
  return {
    type: WS_CLOSE,
    payload: {
      webSocketId: getWebSocketId(webSocket),
      code,
      reason,
      readyState: webSocket.readyState,
      timestamp: performance.now(),
    },
  };
}

export function wsSend(webSocket, data) {
  return {
    type: WS_SEND,
    payload: {
      webSocketId: getWebSocketId(webSocket),
      data,
      readyState: webSocket.readyState,
      timestamp: performance.now(),
    },
  };
}
