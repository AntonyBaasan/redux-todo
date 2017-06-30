import 'babel-polyfill';
import { createStore } from 'redux';
import todoApp from './reducers';
import * as localStorage from './localStorage';
import { throttle } from 'lodash';

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  if (!console.group) {
    return rawDispatch;
  }

  return (action) => {
    console.group(action.type);
    console.log('%c prev state: ', 'color: gray', store.getState());
    console.log('%c action: ', 'color: blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c next state: ', 'color: green', store.getState());
    console.groupEnd(action.type);

    return returnValue;
  };
};

export const configureStore = () => {
  const persistedState = localStorage.loadState();
  const store = createStore(
    todoApp,
    persistedState
  );

  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }

  store.subscribe(throttle(() => {
    localStorage.saveState({
      todos: store.getState().todos,
    });
  }, 1000));

  return store;
};
