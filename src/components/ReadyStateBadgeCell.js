import React from 'react';
import { ReadyStateClosed, ReadyStateClosing, ReadyStateConnecting, ReadyStateOpen } from './Badge';

const ReadyStateBadge = {
  CLOSED: ReadyStateClosed,
  CLOSING: ReadyStateClosing,
  CONNECTING: ReadyStateConnecting,
  OPEN: ReadyStateOpen,
};

export function ReadyStateBadgeCell({ name }) {
  const BadgeForReadyState = ReadyStateBadge[name];
  return BadgeForReadyState ? <BadgeForReadyState /> : null;
}
