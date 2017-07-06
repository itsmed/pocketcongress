import React from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
} from 'react-bootstrap';

const FloorItemPreview = (props) => {
  const { item } = props;
  return (
    <div>
     { 
      item && item.bill ? 
        displayBill(item)
      : 
      item && item.nomination ?
        displayNomination(item)
      :
        ''
      }
    </div>
  );
};

function displayBill(item) {
  return <div>
    <h3>Bill: {item.bill.number}</h3>
    <p>Title: {item.bill.title}</p>
    <p>Question: {item.question}</p>
    <p>Vote Type: {item.vote_type}</p>
    <p>Description: {item.description}</p>
    <p>Date: {item.date}</p>
    <p>Time: {item.time}</p>
    <p>Result: {item.result}</p>
    <Link to={`/bill/details/${item.congress}/${item.bill.number.toLowerCase().replace(/\W/g, '')}`}>
      <Button bsStyle="link">More</Button>
    </Link>
  </div>;
}

function displayNomination(item) {
  return <div>
    <h3>Nomination: {item.nomination.number}</h3>
    <p>Nominee: {item.nomination.name}</p>
    <p>Agency: {item.nomination.agency}</p>
    <p>Question: {item.question}</p>
    <p>Description: {item.description}</p>
    <p>Vote Type: {item.vote_type}</p>
    <p>Date: {item.date}</p>
    <p>Time: {item.time}</p>
    <p>Result: {item.result}</p>
    <Link to={`/nominees/details/${item.congress}/${item.nomination.number}`}>
      <Button bsStyle="link">More</Button>
    </Link>
  </div>;
}

export default FloorItemPreview;
