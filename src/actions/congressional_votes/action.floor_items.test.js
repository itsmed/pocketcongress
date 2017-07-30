import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import {
  getVotesByDate,
  requestFloorItems,
} from './action.floor_items';

import {
  TOGGLE_IS_FETCHING,
  RECEIVE_FLOOR_ITEMS,
  RECEIVE_ERROR_MESSAGE,
} from '../consts';

describe('action.floor_items', () => {
  beforeEach(() => {
    fetchMock.mock(/.+\/api.+/g, { body: {
      House: {},
      Senate: {}
    }});
  });

  afterEach(() => fetchMock.restore());

  test('getVotesByDate returns an object with keys House and Senate', () => {
    expect.assertions(2);

    return getVotesByDate('07', '2017').then(res => {
      const responseKeys = Object.keys(res);

      expect(responseKeys.includes('House')).toBe(true);
      expect(responseKeys.includes('Senate')).toBe(true);

    });
  });

  test('requestFloorItems triggers 3 actions to be dispatched, one of which has type ' +RECEIVE_FLOOR_ITEMS, () => {
    expect.assertions(3);

    const store = mockStore({
      isFetching: false,
      errorMessage: null,
      federalFloorItems: {
        house: { votes: [] },
        senate: { votes: [] }
      }
    });

    return store.dispatch(requestFloorItems('07', '2017')).then(() => {
      const expectedActions = [
        { type: TOGGLE_IS_FETCHING },
        { type: RECEIVE_FLOOR_ITEMS,
          payload: { House: {}, Senate: {} } },
        { type: TOGGLE_IS_FETCHING } 
      ];

      expect(store.getActions().length).toBe(expectedActions.length);
      expect(store.getActions()).toEqual(expectedActions);
      expect(store.getActions().some(action => Object.values(action).includes(RECEIVE_FLOOR_ITEMS))).toBe(true);
    });

  });
});


describe('ERRORS action.floor_items', () => {
  beforeEach(() => {
    fetchMock.mock(/.+\/api.+/g, { body: {
      error: 'A Fake Error Message'
    }});
  });

  afterEach(() => fetchMock.restore());

  test('requestFloorItems triggers 3 actions to be dispatched, one of which has type ' +RECEIVE_ERROR_MESSAGE, () => {
    expect.assertions(3);

    const store = mockStore({
      isFetching: false,
      errorMessage: null,
      federalFloorItems: {
        house: { votes: [] },
        senate: { votes: [] }
      }
    });

    return store.dispatch(requestFloorItems('07', '2017')).then(() => {
      const expectedActions = [
        { type: TOGGLE_IS_FETCHING },
        { type: RECEIVE_ERROR_MESSAGE,
          payload: 'A Fake Error Message' },
        { type: TOGGLE_IS_FETCHING }
      ];

      expect(store.getActions().length).toBe(expectedActions.length);
      expect(store.getActions()).toEqual(expectedActions);
      expect(store.getActions().some(action => Object.values(action).includes(RECEIVE_ERROR_MESSAGE))).toBe(true);
    });

  });


});
