export const EventType = {
  EVENT_CLOSE: 'EVENT_CLOSE',
  EVENT_ERROR: 'EVENT_ERROR',
  EVENT_MESSAGE: 'EVENT_MESSAGE',
  EVENT_OPEN: 'EVENT_OPEN',
  METHOD_CONSTRUCT: 'METHOD_CONSTRUCT',
  METHOD_CLOSE: 'METHOD_CLOSE',
  METHOD_SEND: 'METHOD_SEND',
};

const typeToEventType = {
  close: EventType.EVENT_CLOSE,
  error: EventType.EVENT_ERROR,
  message: EventType.EVENT_MESSAGE,
  open: EventType.EVENT_OPEN,
};

let eventIncrId = 0;

export function eventWsClose(webSocketId, { type, code, reason, timeStamp: timestamp }) {
  return { type: typeToEventType[type], id: ++eventIncrId, webSocketId, code, reason, timestamp };
}

export function eventWsError(webSocketId, { type, timeStamp: timestamp }) {
  return { type: typeToEventType[type], id: ++eventIncrId, webSocketId, timestamp };
}

export function eventWsMessage(
  webSocketId,
  { type, data, origin, source, ports, timeStamp: timestamp }
) {
  return {
    type: typeToEventType[type],
    id: ++eventIncrId,
    webSocketId,
    data,
    origin,
    source,
    ports,
    timestamp,
  };
}

export function eventWsOpen(webSocketId, { type, timeStamp: timestamp }) {
  return { type: typeToEventType[type], id: ++eventIncrId, webSocketId, timestamp };
}

export function eventMethodConstruct(webSocketId, timestamp) {
  return { type: EventType.METHOD_CONSTRUCT, id: ++eventIncrId, webSocketId, timestamp };
}

export function eventMethodClose(webSocketId, code, reason, timestamp) {
  return { type: EventType.METHOD_CLOSE, id: ++eventIncrId, webSocketId, code, reason, timestamp };
}

export function eventMethodSend(webSocketId, data, timestamp) {
  return { type: EventType.METHOD_SEND, id: ++eventIncrId, webSocketId, data, timestamp };
}
