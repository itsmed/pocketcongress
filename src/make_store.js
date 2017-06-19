import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';

import {
  rootReducer,
} from './reducers';

const middlewares = [thunk];

// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(logger);
// }

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
