import {
  combineReducers
} from 'redux';

import {
  reducerUserAuth
} from './user_auth/reducer.user_auth';

import {
  reducerIsFetching
} from './is_fetching/reducer.is_fetching';

export const rootReducer = combineReducers({
  user: reducerUserAuth,
  isFetching: reducerIsFetching,
});
