import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import BillDetails from './containers/bill_details/BillDetails';
import FindRepsContainer from './containers/find_reps_container/FindRepsContainer';
import FloorItemContainer from './containers/floor_item_container/FloorItemContainer';
import Header from './containers/header/Header';
import Footer from './components/footer/Footer';
import Landing from './containers/landing/Landing';
import NomineeDetails from './containers/nominee_details/NomineeDetails';
import SignIn from './containers/sign_in/SignIn';
import SignUp from './containers/sign_up/SignUp';
import UserProfile from './containers/user_profile/UserProfile';

import './App.css';

const NoMatch = () => (<div>No Match</div>);


const App = () => (
  <Router>
    <div>
      <Header />
  
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route path='/floor-items' component={FloorItemContainer} />
          <Route path='/signin' exact component={SignIn} />
          <Route path='/signup' exact component={SignUp} />
          <Route path='/profile' component={UserProfile} />
          <Route path='/bill/details/:congress/:chamber/:session/:rollcall/:id' component={BillDetails}/>
          <Route path='/nominees/details/:congress/:chamber/:session/:rollcall/:id' component={NomineeDetails}/>
          <Route path='/find-reps' component={FindRepsContainer} />
          <Route component={NoMatch}/>
        </Switch>
      <Footer />
    </div>
  </Router>
);

export default App;