import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validate } from 'email-validator';

import {
  authorizeNewUserWithProvider,
  receiveErrorMessage,
  signInWithEmailAndPassword,
  validatePassword,
  getAuthUpdate,
} from '../../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailValue: '',
      passwordValue: '',
    };
  
    this.handleProviderSubmit = this.handleProviderSubmit.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleEmailFormChange = this.handleEmailFormChange.bind(this);
    this.handlePasswordFormChange = this.handlePasswordFormChange.bind(this);
    this.validateInfo = this.validateInfo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.user !== null ) && ( this.props.user !== nextProps.user) ) {
      window.location.replace('/profile');
    }
  }

  handleProviderSubmit(provider) {
    this.props.authorizeNewUserWithProvider(provider);
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

  handleFormSubmit() {
    console.log('called handleFormSubmit signin', this.state.emailValue, this.state.passwordValue);
    this.props.signInWithEmailAndPassword(this.state.emailValue, this.state.passwordValue);
  }

  render() {
    return <div>
    <h3>Sign In</h3>
      <form onSubmit={ this.validateInfo }>
        <input
          type="text"
          onChange={ this.handleEmailFormChange }
          placeholder="email"
          ref="email"
          value={ this.state.emailValue }
        />
        <input
          type="password"
          onChange={ this.handlePasswordFormChange }
          placeholder="password"
          ref="password"
          value={ this.state.passwordValue }
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
  receiveErrorMessage,
  signInWithEmailAndPassword,
  validatePassword,
  getAuthUpdate,
})(SignIn);

