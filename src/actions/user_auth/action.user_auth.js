import {
  AUTH_USER,
  UNAUTH_USER,
} from '../consts';

export const authUser = user => ({
  type: AUTH_USER,
  payload: user
});

export const unauthUser = () => ({
  type: UNAUTH_USER,
  payload: null
});

