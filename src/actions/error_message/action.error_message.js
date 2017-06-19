import {
  ACKNOWLEDGE_ERROR_MESSAGE,
  RECEIVE_ERROR_MESSAGE,
} from '../consts';

export const receiveErrorMessage = (msg) => ({
  type: RECEIVE_ERROR_MESSAGE,
  payload: msg,
});

export const acknowledgeErrorMessage = () => ({
  type: ACKNOWLEDGE_ERROR_MESSAGE,
  payload: null,
});
