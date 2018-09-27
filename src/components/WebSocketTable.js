import React from 'react';

import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { WebSocketTableDetail } from './WebSocketTableDetail';

import 'react-table/react-table.css';

const ReadyState = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];
const readyStateAccessor = ({ readyState }) =>
  typeof readyState === 'number' ? ReadyState[readyState] : null;

const columns = [
  {
    Header: 'URL',
    accessor: 'url',
  },
  {
    Header: 'readyState',
    id: 'readyState',
    accessor: readyStateAccessor,
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
