import {
  API_BASE,
  RECEIVE_USER_DISTRICT_INFO,
  VERIFY_USER_DISTRICT_INF0,
  RECEIVE_USER_REPS,
} from '../consts';

import {
  receiveErrorMessage,
} from '../error_message/action.error_message';

import {
  toggleIsFetching
} from '../is_fetching/action.is_fetching';

export const setUserDistrict = (addrObj) => {
  return dispatch => {
    dispatch(toggleIsFetching());

    fetch(API_BASE.concat('/api/reps/all/federal/by-district'), {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"data": { "district": addrObj.fields.congressional_district.district_number.toString(), "state": addrObj.address_components.state }})
    })
    .then(res => res.json())
    .then(repObj => {
      dispatch(toggleIsFetching());
      return dispatch({
        type: RECEIVE_USER_REPS,
        payload: repObj.reps
      });
    })
    .then(() => {
      dispatch({
        type: VERIFY_USER_DISTRICT_INF0,
        payload: addrObj
      });
    })
    .catch(err => receiveErrorMessage(err.message));
  };
};

