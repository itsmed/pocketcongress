import React from 'react';

const RepPreview = ({rep}) => (
  <div>
      <h3>{rep.role.concat(`, ${rep.party}`)}</h3>
      <h3>{rep.name}</h3>
      <h4>Next Election: {rep.next_election}</h4>
      <a
        href={`http://www.twitter.com/${rep.twitter_id}`}
        target="_blank"
        rel="noopener noreferrer"
      >Twitter</a>
  </div>
);

export default RepPreview;