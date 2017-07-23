import React from 'react';

const RepPreview = ({rep, size}) => (
  <div>
    {
      size === 'small' ?
        <div>
          <h5>{rep.role.concat(`, ${rep.party}`)}</h5>
          <h5>{rep.name}</h5>
          <h6>Next Election: {rep.next_election}</h6>
          <a
            href={`http://www.twitter.com/${rep.twitter_id}`}
            target="_blank"
            rel="noopener noreferrer"
          >Twitter</a>
        </div>
      :
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
    }
  </div>
);

export default RepPreview;