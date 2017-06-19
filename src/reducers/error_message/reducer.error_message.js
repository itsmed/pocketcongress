import {
  ACKNOWLEDGE_ERROR_MESSAGE,
  RECEIVE_ERROR_MESSAGE,
} from '../../actions';

export const reducerErrorMessage = (state = null, action) => {
  switch(action.type) {
  case RECEIVE_ERROR_MESSAGE:
    return action.payload;
  case ACKNOWLEDGE_ERROR_MESSAGE:
    return null;
  default:
    return state;
  }
};
