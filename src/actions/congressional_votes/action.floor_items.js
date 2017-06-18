import localforage from 'localforage';

import {
  RECEIVE_FLOOR_ITEMS,
  API_BASE,
  TOGGLE_IS_FETCHING,
} from '../consts';

export const requestFloorItems = (month, year) => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_IS_FETCHING });
    localforage.getItem(`floorItems_${month}/${year}`)
    .then(results => {
      if (!results) {
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
          localforage.setItem(`floorItems_${month}/${year}`, floorItems)
          .then(savedData => console.log('[LOCAL FORAGE] saved', savedData))
          .catch(err => Promise.reject(err));
          return dispatch({
            type: RECEIVE_FLOOR_ITEMS,
            payload: floorItems
          });
        })
        .catch(err => Promise.reject(err));
      }
    })
    .catch(err => console.log('[LOCAL FORAGE] error!', err));
  };
};
