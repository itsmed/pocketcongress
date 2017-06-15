import {
  RECEIVE_USER_DISTRICT_INFO,
} from '../../actions';

export const reducerUserDistrict = (state = [], action) => {
  switch(action.type) {
  case RECEIVE_USER_DISTRICT_INFO:
    return action.payload.results;
  default:
    return state;
  }
};
