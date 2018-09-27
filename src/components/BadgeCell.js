import React from 'react';
import { Badge } from './Badge';

export function BadgeCell({ value: type }) {
  const BadgeForType = Badge[type];
  return BadgeForType ? <BadgeForType /> : null;
}
