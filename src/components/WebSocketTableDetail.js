import React from 'react';
import ReactTable from 'react-table';
import { DataCell } from './DataCell';
import { EventBadgeCell } from './EventBadgeCell';
import { EventType } from '../lib/models';
import 'react-table/react-table.css';

function formatDuration(ms) {
  let secs = ms / 1000;
  ms = ms % 1000;
  const mins = secs / 60;
  secs = secs % 60;
  const minsStr = mins.toLocaleString(
    'en-US',
    { maximumFractionDigits: 0 }
  );
  const secsStr = secs.toLocaleString(
    'en-US',
    { minimumIntegerDigits: 2, minimumFractionDigits: 3, maximumFractionDigits: 3 }
  );
  return `${minsStr}:${secsStr}`;
}

const columns = baseTime => [
  {
    Header: '',
    accessor: 'type',
    Cell: ({ value }) => <EventBadgeCell type={value} />,
    width: 30,
  },
  {
    Header: 'Data',
    id: 'data',
    Cell: ({ original }) => <DataCell {...original} />,
  },
  {
    Header: 'Time',
    id: 'time',
    accessor: 'timestamp',
    Cell: ({ value: timestamp }) => formatDuration(timestamp - baseTime),
    headerClassName: 'alignRight',
    className: 'time alignRight',
  },
];

function filterEvents(events) {
  return events.filter(
    ({ type }) => type === EventType.EVENT_MESSAGE || type === EventType.METHOD_SEND
  );
}

export function WebSocketTableDetail({ baseTime, events = [] }) {
  return (
    // TODO You are here
    // TODO SubComponent for data
    <ReactTable data={filterEvents(events)} columns={columns(baseTime)} showPagination={false} />
  );
}
