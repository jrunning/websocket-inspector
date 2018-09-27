import React from 'react';
import { Provider } from 'react-redux';
import { WebSocketTable } from '../components/WebSocketTable';
import store from '../lib/redux/store';

export function App() {
  return (
    <Provider store={store}>
      <WebSocketTable />
    </Provider>
  );
}
