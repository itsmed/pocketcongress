import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validate } from 'email-validator';

import AddressForm from '../../containers/addressform/AddressForm';

import { 
  authorizeNewUserWithProvider,
  getAuthUpdate,
  createUserWithEmailAndPassword,
  receiveErrorMessage,
  validatePassword,
  setUserDistrict,
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
      verifiedAddress: null,
      fetching: false,
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
    this.props.createUserWithEmailAndPassword(this.state.emailValue, this.state.passwordValue, this.state.userName, this.state.verifiedAddress);
  }

  handleAddressSubmit(addr) {
    this.setState({
      verifiedAddress: addr,
      currentStep: 1,
    });
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
        currentStep === 1 ?
          this.renderSignUpForm()
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
      <button onClick={ () => this.handleProviderSubmit('google', this.state.verifiedAddress) }>Sign In With Google</button>
    </div>;
  }
}
const mapStateToProps = (state) => ({user: state.user});

export default connect(mapStateToProps , {
  authorizeNewUserWithProvider,
  getAuthUpdate,
  createUserWithEmailAndPassword,
  receiveErrorMessage,
  setUserDistrict,
})(SignUp);

