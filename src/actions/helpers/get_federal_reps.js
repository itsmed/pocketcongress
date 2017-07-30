import {
  API_BASE,
} from '../consts';

import {
  receiveErrorMessage,
} from '../error_message/action.error_message';

export function getFederalReps(state, district) {
  const data = {
    state,
    district,
  };

  return fetch(API_BASE.concat('/api/reps/all/federal/by-district'), {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"data": data })
  })
    .then(res => {
      return res.json();
    })
    .then(json => {
      return json.results;
    })
    .catch(err => receiveErrorMessage(err.message));
}