import {
  combineReducers
} from 'redux';

import {
  reducerUserAuth
} from './user_auth/reducer.user_auth';

import {
  reducerIsFetching
} from './is_fetching/reducer.is_fetching';

import {
  reducerUserDistrict,
} from './user_district/reducer.user_district';

export const rootReducer = combineReducers({
  user: reducerUserAuth,
  isFetching: reducerIsFetching,
  district: reducerUserDistrict,
});
