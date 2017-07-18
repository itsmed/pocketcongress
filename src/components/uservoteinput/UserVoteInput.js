import React from 'react';
import {
  Button,
} from 'react-bootstrap';

const UserVoteInput = ({congress, voteAction}) => (
  <div>
    <Button 
      onClick={ () => voteAction(congress, 'No') } bsStyle="danger">Vote No</Button>
    <Button 
      onClick={ () => voteAction(congress, 'Not Voting') } bsStyle="warning">Abstain</Button>
    <Button 
      onClick={ () => voteAction(congress, 'Yes') } bsStyle="success">Vote Yes</Button>
  </div>
);

export default UserVoteInput;