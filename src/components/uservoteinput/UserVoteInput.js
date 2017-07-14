import React from 'react';
import {
  Button,
} from 'react-bootstrap';

const UserVoteInput = ({bill, voteAction}) => (
  <div>
    <Button 
      onClick={ () => voteAction(bill.congress, 'No') } bsStyle="danger">Vote No</Button>
    <Button 
      onClick={ () => voteAction(bill.congress, 'Not Voting') } bsStyle="warning">Abstain</Button>
    <Button 
      onClick={ () => voteAction(bill.congress, 'Yes') } bsStyle="success">Vote Yes</Button>
  </div>
);

export default UserVoteInput;