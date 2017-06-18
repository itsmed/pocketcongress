import React from 'react';
import { Link } from 'react-router-dom';

const FloorItemPreview = (props) => {
  const { item } = props;
  console.log('item preview', item);
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
    <p>Description: {item.description}</p>
    <button>More</button>
  </div>;
}

function displayNomination(item) {
  return <div>
    <h3>Nomination: {item.nomination.number}</h3>
    <p>Nominee: {item.nomination.name}</p>
    <p>Agency: {item.nomination.agency}</p>
    <p>Question: {item.question}</p>
    <p>Description: {item.description}</p>
    <p>Description: {item.description}</p>
  </div>;
}

export default FloorItemPreview;
