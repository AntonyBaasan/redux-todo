import 'babel-polyfill';
import { createStore } from 'redux';
import todoApp from './reducers';
import * as localStorage from './localStorage';
import { throttle } from 'lodash';

export const configureStore = () => {
  const persistedState = localStorage.loadState();
  const store = createStore(
    todoApp,
    persistedState
  );

  store.subscribe(throttle(() => {
    localStorage.saveState({
      todos: store.getState().todos,
    });
  }, 1000));

  return store;
};
