import {
  RECEIVE_USER_REPS
} from '../../actions';

export const reducerSetFederalReps = (state = {}, action) => {
  switch(action.type) {
  case RECEIVE_USER_REPS:
    return action.payload;
  default:
    return state;
  }
};
