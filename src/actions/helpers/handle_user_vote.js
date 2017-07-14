import { database as db } from '../../firebase_config';

export function handleUserVote(userId, congress, chamber, session, rollcall, position) {

  //votes/congress/chamber/session/rollcallNumber/userOrRepId
  const ref = db.ref(`votes/${congress}/${chamber}/${session}/${rollcall}`);


  ref.once('value', snap => {
    const votes = snap.val();

    for (let vote in votes) {

      if (votes[vote].id === userId && votes[vote].id.position !== position) {

        const update = {};
        update[`/votes/${congress}/${chamber}/${session}/${rollcall}/${vote}/position`] = position;

        return db.ref().update(update);
      }
    }

    ref.push({
      id: userId,
      position: position
    });

  })
  .catch(err => console.warn(err));


  return console.log('user userId, billId', userId, congress, session, rollcall, position);
}