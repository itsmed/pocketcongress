import {
  AUTH_USER,
  UNAUTH_USER,
} from '../../actions';

export const reducerUserAuth = (state = null, action) => {
  switch(action.type) {
  case AUTH_USER:
    console.log('auth user reducer', action);
    return action.payload;
  case UNAUTH_USER:
    return null;
  default:
    return state;
  }
};
