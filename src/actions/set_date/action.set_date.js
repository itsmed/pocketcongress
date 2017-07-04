import {
  SET_DATE,
} from '../consts';

export const setDate = (month, year) => ({
  type: SET_DATE,
  payload: {
    month,
    year,
  }
});
