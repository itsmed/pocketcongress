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
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock,
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
    this.validatePassword = this.validatePassword.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
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
      .catch(err => receiveErrorMessage(err.message));

    this.emailValue.focus();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errorMessage && !this.props.errorMessage) {
      this.setState({
        emailValue: prevState.emailValue.value,
        passwordValue: ''
      });
    }
  }

  handleProviderSubmit(provider) {
    this.props.authorizeNewUserWithProvider(provider);
  }

  handleEmailFormChange() {
    this.setState({
      emailValue: this.emailValue.value,
    });
  }

  handlePasswordFormChange() {
    this.setState({
      passwordValue: this.passwordValue.value,
    });
  }

  validatePassword() {
    if (this.state.passwordValue === undefined ||
      this.state.passwordValue.length === 0) return;
    return validatePassword(this.state.passwordValue) > -1 ? 'success' : 'error';
  }

  validateEmail() {
    if (this.state.emailValue === undefined ||
      this.state.emailValue.length === 0) return;
    return validate(this.state.emailValue) ? 'success' : 'error';
  }

  handleFormSubmit(e) {
    e.preventDefault();
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
            <form style={{marginBottom: '2em', paddingBottom: '2em', borderBottomStyle: 'solid'}} onSubmit={ this.handleFormSubmit }>
              <FormGroup
                controlId='signin--email'
                validationState={ this.validateEmail() }
              >
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  type="text"
                  onChange={ this.handleEmailFormChange }
                  placeholder="email"
                  inputRef={ ref => this.emailValue = ref }
                  value={ this.state.emailValue }
                />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup
                controlId='signin--password'
                validationState={ this.validatePassword() }
              >
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  type="password"
                  onChange={ this.handlePasswordFormChange }
                  placeholder="password"
                  inputRef={ ref => this.passwordValue = ref }
                  value={ this.state.passwordValue }
                />
                <HelpBlock>Passwords must be at least 8 characters long, including at least one number, special character, lowercase letter and capital letter</HelpBlock>
                <FormControl.Feedback />
              </FormGroup>
                <Button type="submit" bsStyle='success' block>Submit</Button>
            </form>
            {
              window.localStorage === undefined || window.sessionStorage === undefined ?
                <h3>This browser does not support this sign in method</h3>
              :
                <div>
                  <h5>Or</h5>
                  <Button bsStyle='primary' onClick={ () => this.handleProviderSubmit('google')}>Sign In With Google</Button>
                </div>
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

