import {
  API_BASE,
  TOGGLE_IS_FETCHING,
  RECEIVE_USER_DISTRICT_INFO,
} from '../consts';

export const getUserDistrict = (lat, long) => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_IS_FETCHING });
    return fetch('http://localhost:8000'.concat('/api/get-district-by-coords'), {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"data": { "lat": '37.6316925', "long": '-122.0527084' }})
    })
    .then(res => res.json())
    .then(repArray => {
      dispatch({ type: TOGGLE_IS_FETCHING });
      return dispatch({
        type: RECEIVE_USER_DISTRICT_INFO,
        payload: repArray
      });
    });
  };
};
