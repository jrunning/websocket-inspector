import React from 'react';
import {
  EventClose,
  EventError,
  EventMessage,
  EventOpen,
  MethodClose,
  MethodConstruct,
  MethodSend,
} from './Badge';

const EventBadge = {
  EVENT_CLOSE: EventClose,
  EVENT_ERROR: EventError,
  EVENT_MESSAGE: EventMessage,
  EVENT_OPEN: EventOpen,
  METHOD_CLOSE: MethodClose,
  METHOD_CONSTRUCT: MethodConstruct,
  METHOD_SEND: MethodSend,
};

export function EventBadgeCell({ type }) {
  const BadgeForType = EventBadge[type];
  return BadgeForType ? <BadgeForType /> : null;
}
