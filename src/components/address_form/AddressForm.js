import React, { Component } from 'react';

import {
  API_BASE,
} from '../../actions';

const AddressConfirmation = ({addr}) => (
  <ul key={addr.address_components.number.concat(addr.address_components.street, addr.address_components.zip)}>
    <li>Number: {addr.address_components.number}</li>
    <li>Street: {addr.address_components.street}</li>
    <li>City: {addr.address_components.city}</li>
    <li>State: {addr.address_components.state}</li>
    <li>Zip Code: {addr.address_components.zip}</li>
  </ul>
);

class AddressForm extends Component {
  constructor(props) {
    super(props);

    this.handleAddressSubmit = this.handleAddressSubmit.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.getUserDistrictByAddress = this.getUserDistrictByAddress.bind(this);
    this.getUserDistrictByLocation = this.getUserDistrictByLocation.bind(this);
    this.verifyAddress = this.verifyAddress.bind(this);
  }

  handleAddressSubmit() {
    const { streetInput, aptInput, cityInput, stateInput, zipInput } = this.refs;
    const params = {
      street: streetInput.value,
      apt: aptInput.value,
      city: cityInput.value,
      state: stateInput.value,
      zip: zipInput.value
    };

    this.getUserDistrictByAddress(params);
  }

  getLocation() {
    this.props.toggleFetching();
    let p = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(p => {
        let params = {
          lat: p.coords.latitude, 
          long: p.coords.longitude
        };
        resolve(params);
      });
    });
    p.then(params => {
      this.getUserDistrictByLocation(params);
    });
  }


  getUserDistrictByLocation (data) {
    return fetch(API_BASE.concat('/api/get-district-by-coords'), {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data })
    })
    .then(res => res.json())
    .then(resp => {
      this.props.submitAddress('possibleAddresses', resp.results);
      return this.props.toggleFetching();
    });
  }

  getUserDistrictByAddress (addrObj) {
    this.props.toggleFetching();
    return fetch(API_BASE.concat('/api/get-district-by-address'), {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "data": addrObj})
    })
    .then(res => res.json())
    .then(resp => {
      this.props.submitAddress('possibleAddresses', resp.results);
      return this.props.toggleFetching();
    });
  };

  verifyAddress(address) {
    this.props.submitAddress('verifiedAddress', address);
  }

  render() {
    return <div>
      { navigator.geolocation ?
          <div>
            <p>If you are at home, you can use your location</p>
            <button onClick={ this.getLocation }>Use My Location</button> 
            <p>- Or -</p>
          </div> 
        :
          ''
      }
      {
        this.props.addresses.map((a, i) => <div key={i} onClick={ () => this.verifyAddress(a) }>
          <AddressConfirmation addr={a} />
        </div>)
      }
      <label>Street: </label><input type="text" placeholder="Street" ref="streetInput" /><br />
      <label>Apartment: </label><input type="text" placeholder="Apartment" ref="aptInput" /><br />
      <label>City: </label><input type="text" placeholder="City" ref="cityInput" /><br />
      <label>State: </label><input type="text" placeholder="State" ref="stateInput" /><br />
      <label>Zip Code: </label><input type="text" placeholder="Zip Code" ref="zipInput" /><br />
      <button onClick={ this.handleAddressSubmit }>Submit</button>
    </div>;
  }
}

export default AddressForm;
