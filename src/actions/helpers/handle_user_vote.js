import { database as db } from '../../firebase_config';

export function handleUserVote(userId, congress, chamber, session, rollcall, position) {

  const votePath = `votes/${congress}/${chamber}/${session}/${rollcall}`;
  const voteRef = db.ref(votePath);
  const itemsVotedOnByUserRef = db.ref(`users/${userId}/voted_on`);

  itemsVotedOnByUserRef.orderByValue().equalTo(votePath).once('value').then(snap => {
    console.log('looking for dupes', snap.val());
    if (snap.val() === null) {
      itemsVotedOnByUserRef.push(votePath);
    } else {
      console.log('found it already', snap.val());
    }
  });

  voteRef.once('value').then(snap => {
    const votes = snap.val();

    for (let voteId in votes) {

      if (votes[voteId].id === userId && votes[voteId].id.position !== position) {

        const update = {};
        update[`/votes/${congress}/${chamber}/${session}/${rollcall}/${voteId}/position`] = position;

        return db.ref().update(update);
      }
    }

    voteRef.push({
      id: userId,
      position: position
    });

  })
  .catch(err => console.warn(err));


  return console.log('user userId, billId', userId, congress, session, rollcall, position);
}