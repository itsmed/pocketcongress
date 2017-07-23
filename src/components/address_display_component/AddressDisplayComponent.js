import React from 'react';

const AddressDisplayComponent = ({addr}) => (
  <ul key={addr.address_components.number.concat(addr.address_components.street, addr.address_components.zip)}>
    <li>Number: {addr.address_components.number}</li>
    <li>Street: {addr.address_components.street}</li>
    <li>City: {addr.address_components.city}</li>
    <li>State: {addr.address_components.state}</li>
    <li>Zip Code: {addr.address_components.zip}</li>
  </ul>
);

export default AddressDisplayComponent;
