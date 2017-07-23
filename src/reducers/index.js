import {
  combineReducers,
} from 'redux';
import {
  reducerUserAuth,
} from './user_auth/reducer.user_auth';
import {
  reducerIsFetching,
} from './is_fetching/reducer.is_fetching';
import {
  reducerUserDistrict,
} from './user_district/reducer.user_district';
import {
  reducerSetFederalReps,
} from './user_reps/reducer.user_reps';
import {
  reducerFederalFloorItems,
} from './congressional_votes/reducer.congressional_votes';
import {
  reducerErrorMessage,
} from './error_message/reducer.error_message';

import {
  reducerSetDate,
} from './set_date/reducer.set_date';

import {
  reducerSetVisitorVotePosition
} from './set_visitor_vote_position/reducer.set_visitor_vote_position';

export const rootReducer = combineReducers({
  user: reducerUserAuth,
  isFetching: reducerIsFetching,
  district: reducerUserDistrict,
  federalReps: reducerSetFederalReps,
  federalFloorItems: reducerFederalFloorItems,
  errorMessage: reducerErrorMessage,
  date: reducerSetDate,
  visitorVotePositions: reducerSetVisitorVotePosition,
});
