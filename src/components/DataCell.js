import React from 'react';
import { EventType } from '../lib/models';

export function DataCell(props) {
  return <pre>{JSON.stringify(props)}</pre>;
}
