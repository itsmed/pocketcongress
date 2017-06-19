import {
  API_BASE,
  TOGGLE_IS_FETCHING,
  RECEIVE_USER_DISTRICT_INFO,
  VERIFY_USER_DISTRICT_INF0,
  RECEIVE_USER_REPS,
} from '../consts';

export const setUserDistrict = (addrObj) => {
  return dispatch => {
    dispatch({
      type: TOGGLE_IS_FETCHING
    });

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
      dispatch({ type: TOGGLE_IS_FETCHING });
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
    .catch(err => {
      console.log('err', err);
    });
  };
};

