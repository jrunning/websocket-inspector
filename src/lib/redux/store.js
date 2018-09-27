import { createStore } from 'redux';
import { wsReducer } from './wsReducer';

const INITIAL_STATE = {
  webSocketEvents: {},
  webSockets: {},
};

const store = createStore(
  wsReducer,
  INITIAL_STATE,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
