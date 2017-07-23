import {
  SET_VISITOR_VOTE_POSITION,
} from '../../actions';

export const reducerSetVisitorVotePosition = (state = [], action) => {
  if (action.type === SET_VISITOR_VOTE_POSITION) {
    
    const i = state.indexOf(state.find(item => item.path === action.payload.path));
    if (i === -1) {
      const newState = [...state, ...[action.payload]];

      return newState;
    } else {
      const newState = state.slice(0);
      newState.splice(i, 1, action.payload);

      return newState;
    }
  } else {
    return state;
  }
};
