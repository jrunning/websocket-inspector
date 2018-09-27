import React from 'react';
import { EventType } from '../lib/models';

export function EventCloseDataCell({ code, reason }) {
  return (
    <span>
      Closed ({code}, {reason})
    </span>
  );
}

export function EventErrorDataCell(props) {
  return <span>Error</span>;
}

export function EventMessageDataCell(props) {
  return <span>{JSON.stringify(props)}</span>;
}

export function EventOpenDataCell(props) {
  return <span>Open</span>;
}

export function MethodConstructDataCell(props) {
  return <span>Created</span>;
}

export function MethodCloseDataCell({ code, reason }) {
  return (
    <span>
      Close ({code}, {reason})
    </span>
  );
}

export function MethodSendDataCell(props) {
  return <span>{JSON.stringify(props)}</span>;
}

const EventTypeToDataCell = {
  [EventType.EVENT_CLOSE]: EventCloseDataCell,
  [EventType.EVENT_ERROR]: EventErrorDataCell,
  [EventType.EVENT_MESSAGE]: EventMessageDataCell,
  [EventType.EVENT_OPEN]: EventOpenDataCell,
  [EventType.METHOD_CONSTRUCT]: MethodConstructDataCell,
  [EventType.METHOD_CLOSE]: MethodCloseDataCell,
  [EventType.METHOD_SEND]: MethodSendDataCell,
};

export function DataCell({ type, ...props }) {
  const CellComponent = EventTypeToDataCell[type];
  return <CellComponent {...props} />;
}
