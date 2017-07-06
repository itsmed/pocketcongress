import { database as db } from '../../firebase_config';

export function handleUserVote(userId, congress, chamber, session, billId, position) {
  return console.log('user userId, billId', userId, congress, session, billId, position);
}