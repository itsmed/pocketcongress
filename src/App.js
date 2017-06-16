import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux';
import {
  getUserDistrictByLocation,
  setUserDistrict,
  requestFloorItems,
} from './actions';

class App extends Component {
  constructor(props) {
    super(props);

    this.findDistrict = this.findDistrict.bind(this);
    this.handleAddressConfirmation = this.handleAddressConfirmation.bind(this);
  }

  findDistrict() {
    // this.props.getUserDistrictByLocation({lat: '37.6317388', long: '-122.0527006'});
    this.props.requestFloorItems('03', '2017');
  }

  handleAddressConfirmation(obj) {
    console.log(obj);
    this.props.setUserDistrict(obj);
  }

  render() {
    console.log('this', this.props);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
        <button onClick={ this.findDistrict }>click</button>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <ul>
          {
            this.props.district.possibleDistricts.map((d, i) => <li key={i} onClick={() => this.handleAddressConfirmation(d) }>{d.fields.congressional_district.district_number}</li>)
          }
          </ul>
      </div>
    );
  }
}

export default connect((state) => state, {
  getUserDistrictByLocation,
  setUserDistrict,
  requestFloorItems
})(App);
