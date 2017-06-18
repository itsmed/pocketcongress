import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';


import FloorItemList from './containers/flooritemlist/FloorItemList';
import Header from './containers/header/Header';
import Landing from './components/landing/Landing';
import SignIn from './components/signin/SignIn';
import SignUp from './components/signup/SignUp';
import UserProfile from './containers/userprofile/UserProfile';

import './App.css';

const NoMatch = () => (<div>No Match</div>);

const App = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/floor-items" exact component={FloorItemList} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/profile" component={UserProfile} />
        <Route component={NoMatch}/>
      </Switch>
    </div>
  </Router>
);


export default App;