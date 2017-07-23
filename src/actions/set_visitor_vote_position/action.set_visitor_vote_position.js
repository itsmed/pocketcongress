import {
  SET_VISITOR_VOTE_POSITION,
} from '../consts';

export const setVisitorVotePosition = (path, position) => ({
  type: SET_VISITOR_VOTE_POSITION,
  payload: {
    path,
    position,
  }
});
