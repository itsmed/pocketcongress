import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validate } from 'email-validator';

import firebase from '../../firebase_config';

import AddressForm from '../../containers/addressform/AddressForm';

import { 
  authorizeNewUserWithProvider,
  getAuthUpdate,
  createUser,
  receiveErrorMessage,
  validatePassword,
  setUserDistrict,
  getFederalReps,
} from '../../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0,
      emailValue: '',
      passwordValue: '',
      userNameValue: '',
      possibleAddresses: [],
      federalReps: [],
      verifiedAddress: null,
      fetching: false,
      user: null,
    };
  
    this.handleProviderSubmit = this.handleProviderSubmit.bind(this);
    this.renderSignUpForm = this.renderSignUpForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleEmailFormChange = this.handleEmailFormChange.bind(this);
    this.handleUserNameFormChange = this.handleUserNameFormChange.bind(this);
    this.handlePasswordFormChange = this.handlePasswordFormChange.bind(this);
    this.validateInfo = this.validateInfo.bind(this);
    this.handleAddressSubmit = this.handleAddressSubmit.bind(this);
    this.receiveAddresses = this.receiveAddresses.bind(this);
    this.toggleFetching = this.toggleFetching.bind(this);
    this.signUpLoadingCard = this.signUpLoadingCard.bind(this);
  }

  componentDidMount() {
    const self = this;
    firebase.auth().getRedirectResult()
      .then(result => {
        console.log('getting redirect result from firebase', result, result.user);
        if (result.user) {
          return self.setState({
            user: result.user,
            currentStep: 1,
          });
        }
      })
      .catch(err => console.log('[FIREBASE COMPONENT DID MOUNT]', err));
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('component did update', prevProps, prevState);
  // }

  handleProviderSubmit(provider) {
    this.props.authorizeNewUserWithProvider(provider);
  }

  validateInfo(e) {
    e.preventDefault();
    if (!(validate(this.state.emailValue))) {
      return this.props.receiveErrorMessage(`[${this.state.emailValue}] is not a valid email`);
    }
    if (validatePassword(this.state.passwordValue) === -1) {
      return this.props.receiveErrorMessage(`Passwords must be at least 8 characters long, including at least one number, special character, lowercase letter and capital letter`);
    }

    // GET USER DISTRICT INFO (step 2) then:
    this.handleFormSubmit();
  }

  handleEmailFormChange() {
    this.setState({
      emailValue: this.refs.email.value,
    });
  }

  handleUserNameFormChange() {
    this.setState({
      userName: this.refs.userName.value,
    });
  }

  handlePasswordFormChange() {
    this.setState({
      passwordValue: this.refs.password.value,
    });
  }

  handleFormSubmit() {
    const self = this;
    // const user = {
    //   email: this.state.emailValue,
    //   displayName: this.state.userName
    // };
    // this.setState({
    //   user,
    //   currentStep: 1
    // });
    return firebase.auth().createUserWithEmailAndPassword(this.state.emailValue, this.state.passwordValue)
      .then(result => {
        console.log('created user', result);
        const newUser = Object.assign({}, result, {
          displayName: self.state.userName
        });
        self.setState({
          user: newUser,
          currentStep: 1
        });
      })
      .catch(err => console.log('ERROR CREATING USER', err));
    // this.props.createUser(this.state.emailValue, this.state.passwordValue, this.state.userName, this.state.verifiedAddress, this.state.federalReps);
  }

  handleAddressSubmit(addr) {
    const self = this;
    console.log('handleAddressSubmit called with', addr);
    return getFederalReps(addr.address_components.state, addr.fields.congressional_district.district_number)
        .then(reps => {
          console.log('got reps in component!', reps, self.state);
          self.setState({
            verifiedAddress: addr,
            currentStep: 2,
            federalReps: reps,
          });
        })
        .then(() => this.props.createUser(this.state.user, this.state.verifiedAddress, this.state.federalReps))
        .catch(err => console.log('everything is fukced', err.message));
    
  }

  receiveAddresses(key, addr) {
    console.log('receiving ', key, addr);
    if (key === 'verifiedAddress') {
      return this.handleAddressSubmit(addr);
    }
    const newState = {};
    newState[key] = addr;
    this.setState(newState);
  }

  toggleFetching() {
    this.setState({
      fetching: !this.state.fetching
    });
  }

  signUpLoadingCard () {
    return <div>
      <h1>Sign Up Loading...</h1>
    </div>;
  }

  render() {
    const { currentStep, fetching } = this.state;
    return <div>
      <h2>Sign Up</h2>
      {
        fetching === true ?
          this.signUpLoadingCard()
        :
        currentStep === 0 ?
          this.renderSignUpForm()
        :
        currentStep === 1 ?
          <div>
            <h4>Set Your Congressional District</h4>
            <p>Set your district. You can search for other ones AT THIS LINK</p>
            <p>Congressional districts are based on lines drawn by Congress every 10 years following the results of the census. EXPLAIN WHY THIS IS NEEED</p>
            <AddressForm 
              submitAddress={ this.receiveAddresses }
              addresses={ this.state.possibleAddresses }
              toggleFetching={ this.toggleFetching }
            />
          </div>
        :
        currentStep === 2 ?
          'step3'
        :
          'default!'
      }
    </div>;
  }

  renderSignUpForm() {
    return <div>
      <form onSubmit={ this.validateInfo }>
        <input
          type="text"
          onChange={ this.handleEmailFormChange }
          placeholder="email"
          ref="email"
        />
        <input
          type="text"
          onChange={ this.handleUserNameFormChange }
          placeholder="user name"
          ref="userName"
        />
        <input
          type="password"
          onChange={ this.handlePasswordFormChange }
          placeholder="password"
          ref="password"
        />
        <input
          type="submit"
          value="Submit"
        />
      </form>
      <button onClick={ () => this.handleProviderSubmit('google') }>Sign In With Google</button>
    </div>;
  }
}
const mapStateToProps = (state) => ({user: state.user});

export default connect(mapStateToProps , {
  authorizeNewUserWithProvider,
  getAuthUpdate,
  createUser,
  receiveErrorMessage,
  setUserDistrict,
})(SignUp);

