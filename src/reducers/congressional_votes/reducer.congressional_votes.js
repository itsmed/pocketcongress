import {
  RECEIVE_FLOOR_ITEMS,
} from '../../actions';

export const reducerFederalFloorItems = (state = {
  house: {
    votes: [],
  },
  senate: {
    votes: [],
  },
}, action) => {
  switch(action.type) {
  case RECEIVE_FLOOR_ITEMS:
    return Object.assign({}, state, {
      house: action.payload.House || state.house,
      senate: action.payload.Senate || state.senate,
    });
  default:
    return state;
  }
};