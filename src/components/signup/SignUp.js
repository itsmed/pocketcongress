import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validate } from 'email-validator';

import { 
  authorizeNewUserWithProvider,
  getAuthUpdate,
  createUserWithEmailAndPassword,
  receiveErrorMessage,
} from '../../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0,
    };
  
    this.handleProviderSubmit = this.handleProviderSubmit.bind(this);
    this.incrementCurrentStep = this.incrementCurrentStep.bind(this);
    this.renderInitialSignUpForm = this.renderInitialSignUpForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleEmailFormChange = this.handleEmailFormChange.bind(this);
    this.handlePasswordFormChange = this.handlePasswordFormChange.bind(this);
    this.validateInfo = this.validateInfo.bind(this);
  }

  handleProviderSubmit(provider) {
    this.props.authorizeNewUserWithProvider(provider);
    this.incrementCurrentStep();
  }

  incrementCurrentStep() { 
    this.setState({
      currentStep: this.state.currentStep++,
      emailValue: '',
      passwordValue: ''
    });
  }

  validateInfo(e) {
    e.preventDefault();
    if (!(validate(this.state.emailValue))) {
      return this.props.receiveErrorMessage(`[${this.state.emailValue}] is not a valid email`);
    }
    if (validatePassword(this.state.passwordValue) === -1) {
      return this.props.receiveErrorMessage(`Passwords must be at least 8 characters long, including at least one number, special character, lowercase letter and capital letter`);
    }
  }

  handleEmailFormChange() {
    this.setState({
      emailValue: this.refs.email.value,
    });
  }

  handlePasswordFormChange() {
    this.setState({
      passwordValue: this.refs.password.value,
    });
  }

  handleFormSubmit(e) {
    this.props.createUserWithEmailAndPassword(this.state.emailValue, this.state.passwordValue);
  }

  render() {
    const { currentStep } = this.state;
    return <div>
      <h2>Sign Up</h2>
      {
        currentStep === 0 ?
          this.renderInitialSignUpForm()
        :
        currentStep === 1 ?
          'step1'
        :
        currentStep === 2 ?
          'step2'
        :
          'alldone'
      }
    </div>;
  }
  renderInitialSignUpForm() {
    return <div>
      <form onSubmit={ this.validateInfo }>
        <input
          type="text"
          onChange={ this.handleEmailFormChange }
          placeholder="email"
          ref="email"
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
      <button onClick={ () => this.handleProviderSubmit('google')}>Sign In With Google</button>
    </div>;
  }
}
const mapStateToProps = (state) => ({user: state.user});

export default connect(mapStateToProps , {
  authorizeNewUserWithProvider,
  getAuthUpdate,
  createUserWithEmailAndPassword,
  receiveErrorMessage,
})(SignUp);


function validatePassword(pw) {
  return pw.search(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm);
}
