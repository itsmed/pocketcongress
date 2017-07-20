// import localforage from 'localforage';

import {
  API_BASE,
  RECEIVE_FLOOR_ITEMS,
} from '../consts';

import { toggleIsFetching } from '../is_fetching/action.is_fetching';
import { receiveErrorMessage } from '../error_message/action.error_message';

export const requestFloorItems = (month, year) => {
  return (dispatch) => {
    dispatch(toggleIsFetching());
    return getVotesByDate(month, year)
      .then(res => res.json())
      .then(jsonResponse => dispatch({ type: RECEIVE_FLOOR_ITEMS, payload: jsonResponse }))
      .then(() => dispatch(toggleIsFetching()))
      .catch(err => {
        console.log('error', err.message);
        dispatch(receiveErrorMessage(err.message));
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
