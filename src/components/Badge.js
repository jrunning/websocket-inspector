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

const makeBadge = (Component, title, color) => () => (
  <div title={title}>
    <Component color={color} size={20} title={title} />
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

export const ReadyStateConnecting = makeBadge(Zap, 'Connecting', 'rgb(255, 215, 0, .5)');
ReadyStateConnecting.displayName = 'ReadyStateConnecting';
export const ReadyStateOpen = makeBadge(Zap, 'Open', 'gold');
ReadyStateOpen.displayName = 'ReadyStateOpen';
export const ReadyStateClosing = makeBadge(ZapOff, 'Closing', 'rgb(105, 105, 105, .5)');
ReadyStateClosing.displayName = 'ReadyStateClosing';
export const ReadyStateClosed = makeBadge(ZapOff, 'Closed', 'dimgray');
ReadyStateClosed.displayName = 'ReadyStateClosed';
