import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validate } from 'email-validator';

import firebase from '../../firebase_config';

import {
  acknowledgeErrorMessage,
  authorizeNewUserWithProvider,
  receiveErrorMessage,
  signInWithEmailAndPassword,
  validatePassword,
  setUser,
} from '../../actions';

import {
  Button,
} from 'react-bootstrap';

import ErrorMessage from '../../components/error_message/ErrorMessage';

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

  componentDidMount() {
    const self = this;
    firebase.auth().getRedirectResult()
      .then(result => {
        if (result.user) {
          return self.props.setUser(result.user);
        }
      })
      .catch(err => console.log('[FIREBASE COMPONENT DID MOUNT]', err));

    this.refs.email.focus();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errorMessage && !this.props.errorMessage) {
      this.setState({
        emailValue: prevState.emailValue,
        passwordValue: ''
      });
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
    this.props.signInWithEmailAndPassword(this.state.emailValue, this.state.passwordValue);
  }

  render() {
    return <div>
    <h3>Sign In</h3>
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
  receiveErrorMessage,
  signInWithEmailAndPassword,
  validatePassword,
  setUser,
})(SignIn);

