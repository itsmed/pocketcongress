import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import { connect } from 'react-redux';


import BillDetails from './components/billdetails/BillDetails';
import FloorItemList from './containers/flooritemlist/FloorItemList';
import Header from './containers/header/Header';
import Landing from './components/landing/Landing';
import NomineeDetails from './components/nomineedetails/NomineeDetails';
import SignIn from './components/signin/SignIn';
import SignUp from './components/signup/SignUp';
import UserProfile from './containers/userprofile/UserProfile';

import './App.css';
import { acknowledgeErrorMessage } from './actions';


const NoMatch = () => (<div>No Match</div>);
const ErrorMessage = (props) => (<div onClick={ props.acknowledgeErrorMessage }><span>click to close</span><br />{props.errorMessage}</div>);

const App = (props) => (
  <Router>
    <div>
      <Header />
      {
        props.isFetching ?
          <div>
            <h1>LOADING...</h1>
          </div>
        :
        props.errorMessage !== null ?
          <ErrorMessage
            acknowledgeErrorMessage={ props.acknowledgeErrorMessage } 
            errorMessage={ props.errorMessage } 
          />
        :
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/floor-items" exact component={FloorItemList} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/profile" component={UserProfile} />
            <Route path="/bill/details/:congress/:id" component={BillDetails}/>
            <Route path="/nominees/details/:congress/:id" component={NomineeDetails}/>
            <Route component={NoMatch}/>
          </Switch>
      }
    </div>
  </Router>
);

const mapStateToProps = (state) => ({
  isFetching: state.isFetching,
  errorMessage: state.errorMessage,
});

export default connect(mapStateToProps, { acknowledgeErrorMessage })(App);