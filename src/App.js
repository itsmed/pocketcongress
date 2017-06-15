import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { getUserDistrict } from './actions';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);

    this.findDistrict = this.findDistrict.bind(this);
  }

  findDistrict() {
    this.props.getUserDistrict({lat: '37.6317388', long: '-122.0527006'});
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
        }
        </p>
      </div>
    );
  }
}

export default connect((state) => state, { getUserDistrict })(App);
