import {
  TOGGLE_IS_FETCHING,
} from '../../actions';

export const reducerIsFetching = (state = false, action) => {
  switch(action.type) {
  case TOGGLE_IS_FETCHING:
    return !state;
  default:
    return state;
  }
};
