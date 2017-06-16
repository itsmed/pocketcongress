import {
  RECEIVE_FLOOR_ITEMS,
  API_BASE,
  TOGGLE_IS_FETCHING,
} from '../consts';

export const requestFloorItems = (month, year) => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_IS_FETCHING });
    return fetch(API_BASE.concat('/api/votes/date'), {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"data": { month, year }})
    })
    .then(res => res.json())
    .then(floorItems => {
      dispatch({ type: TOGGLE_IS_FETCHING });

      return dispatch({
        type: RECEIVE_FLOOR_ITEMS,
        payload: floorItems
      });
    });
  };
};
