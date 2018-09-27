import React from 'react';
import {
  AlertTriangle,
  ChevronsRight,
  ChevronsLeft,
  PlayCircle,
  StopCircle,
  Zap,
  ZapOff,
} from 'react-feather';

const makeBadge = (Component, title, color, size = 20) => () => (
  <div title={title}>
    <Component color={color} size={size} />
  </div>
);

export const EventClose = makeBadge(ZapOff, 'Event: close', 'dimgray');
EventClose.displayName = 'EventClose';
export const EventError = makeBadge(AlertTriangle, 'Event: error', 'red');
EventError.displayName = 'EventError';
export const EventMessage = makeBadge(ChevronsLeft, 'Event: message', 'orange');
EventMessage.displayName = 'EventMessage';
export const EventOpen = makeBadge(Zap, 'Event: open', 'gold');
EventOpen.displayName = 'EventOpen';
export const MethodClose = makeBadge(StopCircle, 'Called: WebSocket#close', 'orangered');
MethodClose.displayName = 'MethodClose';
export const MethodConstruct = makeBadge(PlayCircle, 'Called: new WebSocket', 'green');
MethodConstruct.displayName = 'MethodConstruct';
export const MethodSend = makeBadge(ChevronsRight, 'Called: WebSocket#send', 'mediumblue');
MethodSend.displayName = 'MethodSend';

export const Badge = {
  EVENT_CLOSE: EventClose,
  EVENT_ERROR: EventError,
  EVENT_MESSAGE: EventMessage,
  EVENT_OPEN: EventOpen,
  METHOD_CLOSE: MethodClose,
  METHOD_CONSTRUCT: MethodConstruct,
  METHOD_SEND: MethodSend,
};
