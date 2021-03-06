import React from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
} from 'react-bootstrap';

const FloorItemPreview = (props) => {
  const { item, chamber, session, rollCall } = props;
  return (
    <div>
     { 
      item && item.bill ? 
        displayBill(item, chamber, session, rollCall)
      : 
      item && item.nomination ?
        displayNomination(item, chamber, session, rollCall)
      :
        ''
      }
    </div>
  );
};

function displayBill(item, chamber, session, rollCall) {
  return <div style={{borderBottomStyle: 'solid', borderBottomWidth: '1px'}}>
    <h3>Bill: {item.bill.number}</h3>
    <p>Title: {item.bill.title}</p>
    <p>Question: {item.question}</p>
    <p>Vote Type: {item.vote_type}</p>
    <p>Description: {item.description}</p>
    <p>Date: {item.date}</p>
    <p>Time: {item.time}</p>
    <p>Result: {item.result}</p>
    <Link to={`/bill/details/${item.congress}/${chamber}/${session}/${rollCall}/${item.bill.number.toLowerCase().replace(/\W/g, '')}`}>
      <Button bsStyle="link">More</Button>
    </Link>
  </div>;
}

function displayNomination(item, chamber, session, rollCall) {
  return <div style={{borderBottomStyle: 'solid', borderBottomWidth: '1px'}}>
    <h3>Nomination: {item.nomination.number}</h3>
    <p>Nominee: {item.nomination.name}</p>
    <p>Agency: {item.nomination.agency}</p>
    <p>Question: {item.question}</p>
    <p>Description: {item.description}</p>
    <p>Vote Type: {item.vote_type}</p>
    <p>Date: {item.date}</p>
    <p>Time: {item.time}</p>
    <p>Result: {item.result}</p>
    <Link to={`/nominees/details/${item.congress}/${chamber}/${session}/${rollCall}/${item.nomination.number}`}>
      <Button bsStyle="link">More</Button>
    </Link>
  </div>;
}

export default FloorItemPreview;
