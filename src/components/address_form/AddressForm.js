import React, { Component } from 'react';

import {
  API_BASE,
} from '../../actions';

import {
  Button,
  FormControl,
  FormGroup,
  ControlLabel,
  Grid,
  Col,
  Row
} from 'react-bootstrap';

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
    const { streetInput, aptInput, cityInput, stateInput, zipInput } = this;
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
        this.props.addresses.length === 0 ?
          <div>
            { navigator.geolocation ?
              <div style={{marginBottom: '5em', borderBottomStyle: 'solid'}}>
                <p>If you are at home, you can use your location</p>
                <Button bsStyle='primary' onClick={ this.getLocation } block>Use My Location</Button> 
              </div> 
            :
              ''
            }
            <form onSubmit={ this.handleAddressSubmit }>
              <p>Or use this address</p>
              <FormGroup controlId='street'>
                <ControlLabel>Street</ControlLabel>
                <FormControl
                  type="text"
                  onChange={ () => '' }
                  placeholder="street"
                  inputRef={ ref => this.streetInput = ref }
                />
                <FormControl.Feedback />
              </FormGroup>

              <FormGroup controlId='apartment'>
                <ControlLabel>Apartment</ControlLabel>
                <FormControl
                  type="text"
                  onChange={ () => '' }
                  placeholder="apartment"
                  inputRef={ ref => this.aptInput = ref }
                />
                <FormControl.Feedback />
              </FormGroup>

              <FormGroup controlId='city'>
                <ControlLabel>City</ControlLabel>
                <FormControl
                  type="text"
                  onChange={ () => '' }
                  placeholder="city"
                  inputRef={ ref => this.cityInput = ref }
                />
                <FormControl.Feedback />
              </FormGroup>

              <FormGroup controlId='state'>
                <ControlLabel>State</ControlLabel>
                <FormControl
                  type="text"
                  onChange={ () => '' }
                  placeholder="state"
                  inputRef={ ref => this.stateInput = ref }
                />
                <FormControl.Feedback />
              </FormGroup>

              <FormGroup controlId='zipcode'>
                <ControlLabel>Zip Code</ControlLabel>
                <FormControl
                  type="text"
                  onChange={ () => '' }
                  placeholder="zip code"
                  inputRef={ ref => this.zipInput = ref }
                />
                <FormControl.Feedback />
              </FormGroup>

              <Button bsStyle='success' type='submit' onClick={ this.handleAddressSubmit } block>Submit</Button>
            </form>
          </div>
        :
          <Grid>
            <Row>
            {
              this.props.addresses.map((a, i) => <Col xs={12} md={4} key={i} onClick={ () => this.verifyAddress(a) }>
                <AddressDisplayComponent addr={a} />
              </Col>)
            }
            </Row>
          </Grid>
      }
    </div>;
  }
}

export default AddressForm;
