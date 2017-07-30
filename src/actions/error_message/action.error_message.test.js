import {
  receiveErrorMessage,
  acknowledgeErrorMessage,
} from './action.error_message';

import {
  ACKNOWLEDGE_ERROR_MESSAGE,
  RECEIVE_ERROR_MESSAGE,
} from '../consts';

test('receiveErrorMessage returns an action object with type ' + RECEIVE_ERROR_MESSAGE, () => {
  const msg = 'fake error message';

  expect(receiveErrorMessage(msg)).toEqual({ type: RECEIVE_ERROR_MESSAGE, payload: msg });
});

test('acknowledgeErrorMessage returns an action object with type ' + ACKNOWLEDGE_ERROR_MESSAGE, () => {
  expect(acknowledgeErrorMessage()).toEqual({ type: ACKNOWLEDGE_ERROR_MESSAGE, payload: null });
});
