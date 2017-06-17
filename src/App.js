import React, { Component } from 'react';
import { connect } from 'react-redux';

import logo from './logo.svg';
import './App.css';

import {
  authorizeNewUserWithProvider,
  getAuthUpdate,
  getUserDistrictByLocation,
  setUserDistrict,
  requestFloorItems,
  unauthUser,
} from './actions';

import firebase from './firebase_config';
import {
  auth,
} from './firebase_config';

class App extends Component {
  constructor(props) {
    super(props);

    this.findDistrict = this.findDistrict.bind(this);
    this.handleAddressConfirmation = this.handleAddressConfirmation.bind(this);

    this.login = this.login.bind(this);
    this.signout = this.signout.bind(this);
  }

  findDistrict() {
    // this.props.getUserDistrictByLocation({lat: '37.6317388', long: '-122.0527006'});
    this.props.requestFloorItems('03', '2017');
  }

  handleAddressConfirmation(obj) {
    console.log(obj);
    this.props.setUserDistrict(obj);
  }

  componentDidMount() {
    console.log('mounting', firebase.User);
    this.props.getAuthUpdate();
  }

  login(provider) {
    const { authorizeNewUserWithProvider } = this.props;

    console.log('calling login');
    authorizeNewUserWithProvider(provider);
  }

  signout() {
    const { unauthUser } = this.props;

    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log('signout succe');
      unauthUser();
    }).catch(function(error) {
      // An error happened.
      console.log('eror', error);
    });
  }

  render() {
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
        <button onClick={ () => this.login('google') }>Login With Google</button>
        <button onClick={ this.signout }>Sign Out</button>
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
  authorizeNewUserWithProvider,
  getAuthUpdate,
  getUserDistrictByLocation,
  setUserDistrict,
  requestFloorItems,
  unauthUser,
})(App);
