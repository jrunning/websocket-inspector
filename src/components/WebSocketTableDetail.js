import React from 'react';
import ReactTable from 'react-table';
import { BadgeCell } from './BadgeCell';
import { DataCell } from './DataCell';
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

const timeAccessor = baseTime => ({ timestamp }) => formatDuration(timestamp - baseTime);

const columns = baseTime => [
  {
    Header: '',
    id: 'icon',
    accessor: 'type',
    Cell: BadgeCell,
    width: 30,
  },
  {
    Header: 'Data',
    id: 'data',
    accessor: x => (console.log(JSON.stringify(x.original)), x.original),
    Cell: DataCell,
  },
  {
    Header: 'Time',
    id: 'time',
    accessor: timeAccessor(baseTime),
    headerClassName: 'alignRight',
    className: 'time alignRight',
  },
];

export function WebSocketTableDetail({ baseTime, events = [] }) {
  return <ReactTable data={events} columns={columns(baseTime)} showPagination={false} />;
}
