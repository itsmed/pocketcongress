import {
  API_BASE,
} from '../consts';

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
      console.log('got these resps', json.results);
      return json.results;
    })
    .catch(err => Promise.reject(err));
}