import {
  RECEIVE_FLOOR_ITEMS,
} from '../../actions';

export const reducerFederalFloorItems = (state = {
  house: {},
  senate: {}
}, action) => {
  switch(action.type) {
  case RECEIVE_FLOOR_ITEMS:
    return Object.assign({}, state, {
      house: action.payload.House,
      senate: action.payload.Senate
    });
  default:
    return state;
  }
};