import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validate } from 'email-validator';

import firebase from '../../firebase_config';

import {
  acknowledgeErrorMessage,
  authorizeNewUserWithProvider,
  getAuthUpdate,
  createUser,
  receiveErrorMessage,
  validatePassword,
  setUserDistrict,
  getFederalReps,
} from '../../actions';

import {
  Button,
} from 'react-bootstrap';

import AddressForm from '../../components/address_form/AddressForm';
import ErrorMessage from '../../components/error_message/ErrorMessage';

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

    this.refs.email.focus();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errorMessage && !this.props.errorMessage) {
      this.setState(Object.assign({}, prevState, {
        passwordValue: '',
      }));
    }
  }

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
    this.handleFormSubmit();
  }

  handleEmailFormChange() {
    this.setState({
      emailValue: this.refs.email.value,
    });
  }

  handleUserNameFormChange() {
    this.setState({
      userNameValue: this.refs.userName.value,
    });
  }

  handlePasswordFormChange() {
    this.setState({
      passwordValue: this.refs.password.value,
    });
  }

  handleFormSubmit() {
    const self = this;
    return firebase.auth().createUserWithEmailAndPassword(this.state.emailValue, this.state.passwordValue)
      .then(result => {

        const newUser = Object.assign({}, result, {
          displayName: self.state.userName
        });
        self.setState({
          user: newUser,
          currentStep: 1
        });
      })
      .catch(err => receiveErrorMessage(err.message));
  }

  handleAddressSubmit(addr) {
    const self = this;

    return getFederalReps(addr.address_components.state, addr.fields.congressional_district.district_number)
        .then(reps => {

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
            <p>Congressional districts are based on lines drawn by Congress every 10 years following the results of the census. As a result, a zip code alone is not enough to determine your congressional distrit.</p>
            <h6>This information will not be shared with anyone.</h6>
            <AddressForm 
              submitAddress={ this.receiveAddresses }
              addresses={ this.state.possibleAddresses }
              toggleIsFetching={ this.toggleFetching }
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
      {
        this.props.errorMessage ?
          <ErrorMessage
            errorMessage={ this.props.errorMessage }
            acknowledgeErrorMessage={ this.props.acknowledgeErrorMessage }
          />
        :
          <div>
            <form onSubmit={ this.validateInfo }>
              <input
                type="email"
                onChange={ this.handleEmailFormChange }
                placeholder="email"
                ref="email"
                value={ this.state.emailValue }
              />
              <input
                type="text"
                onChange={ this.handleUserNameFormChange }
                placeholder="user name"
                ref="userName"
                value={ this.state.userNameValue }
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
            {
              window.localStorage === undefined || window.sessionStorage === undefined ?
                <h3>This browser does not support this sign in method</h3>
              :
                <Button onClick={ () => this.handleProviderSubmit('google')}>Sign In With Google</Button>
            }
          </div>
      }
    </div>;
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  errorMessage: state.errorMessage,
});

export default connect(mapStateToProps , {
  acknowledgeErrorMessage,
  authorizeNewUserWithProvider,
  getAuthUpdate,
  createUser,
  receiveErrorMessage,
  setUserDistrict,
})(SignUp);

