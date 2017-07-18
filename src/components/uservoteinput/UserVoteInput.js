import React from 'react';
import {
  Button,
} from 'react-bootstrap';

const UserVoteInput = ({congress, voteAction}) => (
  <div>
    <Button 
      onClick={ () => voteAction(congress, 'No') } bsStyle="primary" bsClass="btn button__primary" style={{margin: '10px'}}>Vote No</Button>
    <Button 
      onClick={ () => voteAction(congress, 'Not Voting') } bsStyle="warning" style={{margin: '10px'}}>Abstain</Button>
    <Button 
      onClick={ () => voteAction(congress, 'Yes') } bsStyle="success" style={{margin: '10px'}}>Vote Yes</Button>
  </div>
);

export default UserVoteInput;