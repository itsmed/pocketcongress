import { TOGGLE_IS_FETCHING } from '../consts';
import { toggleIsFetching } from './action.is_fetching';

it('returns an action object with type ' + TOGGLE_IS_FETCHING, () => {
  
  expect(toggleIsFetching()).toEqual({ type: TOGGLE_IS_FETCHING });
  expect(toggleIsFetching('foo')).toEqual({ type: TOGGLE_IS_FETCHING });
  expect(toggleIsFetching([1, 2, 3, 4])).toEqual({ type: TOGGLE_IS_FETCHING });
});
