import React, { Component } from 'react';

import {
  API_BASE,
} from '../../actions';

import AddressDisplayComponent from '../address_display_component/AddressDisplayComponent';

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
    this.props.toggleIsFetching();
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
      return this.props.toggleIsFetching();
    });
  }

  getUserDistrictByAddress (addrObj) {
    this.props.toggleIsFetching();
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
      return this.props.toggleIsFetching();
    });
  };

  verifyAddress(address) {
    this.props.submitAddress('verifiedAddress', address);
  }

  render() {
    return <div>
      {
        this.props.addresses.map((a, i) => <div key={i} onClick={ () => this.verifyAddress(a) }>
          <AddressDisplayComponent addr={a} />
        </div>)
      }
      { navigator.geolocation ?
          <div>
            <p>If you are at home, you can use your location</p>
            <button onClick={ this.getLocation }>Use My Location</button> 
            <p>- Or -</p>
          </div> 
        :
          ''
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
