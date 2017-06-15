import {
  RECEIVE_USER_DISTRICT_INFO,
  VERIFY_USER_DISTRICT_INF0,
} from '../../actions';

export const reducerUserDistrict = (state = {
  possibleDistricts: [],
  verifiedDistrict: null
}, action) => {
  switch(action.type) {
  case RECEIVE_USER_DISTRICT_INFO:
    return {
      possibleDistricts: action.payload.results
    };
  case VERIFY_USER_DISTRICT_INF0:
    return {
      verifiedDistrict: action.payload
    };
  default:
    return state;
  }
};
