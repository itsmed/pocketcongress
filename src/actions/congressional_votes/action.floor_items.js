import localforage from 'localforage';

import {
  RECEIVE_FLOOR_ITEMS,
  API_BASE,
} from '../consts';
import { toggleIsFetching } from '../is_fetching/action.is_fetching';

export const requestFloorItems = (month, year) => {
  return (dispatch) => {
    dispatch(toggleIsFetching());
    localforage.getItem(`${month}/${year}`)
    .then(results => {
      if (!results) {
        getVotesByDate(month, year)
        .then(res => res.json())
        .then(floorItems => {
          localforage.setItem(`${month}/${year}`, floorItems)
          .then(savedData => {
            dispatch({
              type: RECEIVE_FLOOR_ITEMS,
              payload: floorItems
            });
            return dispatch(toggleIsFetching());
          })
          .catch(err => Promise.reject(err));
        })
        .catch(err => Promise.reject(err));
      } else {
        dispatch({
          type: RECEIVE_FLOOR_ITEMS,
          payload: results
        });
        return dispatch(toggleIsFetching());
      }
    })
    .catch(err => {
      console.log('[LOCAL FORAGE] error!', err);
      return dispatch(toggleIsFetching()); 
    });
  };
};

export function getVotesByDate(month, year) {
  return fetch(API_BASE.concat(`/api/votes/date/${month}/${year}`), {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
