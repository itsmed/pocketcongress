import {
  SET_DATE,
} from '../../actions';

const now = new Date();

export const reducerSetDate = (state = {
  month: now.getMonth() + 1,
  year: now.getFullYear(),
}, action) => {
  switch(action.type) {
  case SET_DATE:
    return action.payload;
  default:
    return state;
  }
};

