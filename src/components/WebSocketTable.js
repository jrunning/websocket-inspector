import React from 'react';

import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { ReadyStateBadgeCell } from './ReadyStateBadgeCell';
import { WebSocketTableDetail } from './WebSocketTableDetail';

import 'react-table/react-table.css';

const ReadyStateName = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];

const protocolsAccessor = ({ protocols = [] }) => protocols.join(', ');

function formatTimestamp(timestamp) {
  const date = new Date(performance.timeOrigin + timestamp);
  const time = date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  });
  const millis = date.getMilliseconds().toLocaleString(
    'en-US',
    { maximumFractionDigits: 0, minimumIntegerDigits: 3 }
  );
  return `${time}.${millis}`;
}

const columns = [
  {
    Header: '',
    accessor: 'readyState',
    Cell: ({ value }) => <ReadyStateBadgeCell name={ReadyStateName[value]} />,
    width: 30,
  },
  {
    Header: 'URL',
    accessor: 'url',
  },
  {
    Header: 'Protocols',
    id: 'protocols',
    accessor: protocolsAccessor,
  },
  {
    Header: 'Time',
    accessor: 'timestamp',
    // TODO Make this prettier
    Cell: ({ value }) => formatTimestamp(value),
  },
];

export function WebSocketTableView({ webSocketEvents, webSockets = [] }) {
  return (
    <ReactTable
      columns={columns}
      data={webSockets}
      defaultExpanded={Object.assign({}, webSockets.map(() => true))}
      collapseOnDataChange={false}
      showPagination={false}
      style={{ height: '100vh' }}
      SubComponent={({ original: { timestamp, webSocketId } }) => (
        <WebSocketTableDetail baseTime={timestamp} events={webSocketEvents[webSocketId]} />
      )}
    />
  );
}

const mapStateToProps = ({ webSockets, webSocketEvents }) => ({
  webSocketEvents,
  webSockets: Object.values(webSockets),
});

export const WebSocketTable = connect(mapStateToProps)(WebSocketTableView);
