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
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock,
} from 'react-bootstrap';

import AddressForm from '../../components/address_form/AddressForm';
import ErrorMessage from '../../components/error_message/ErrorMessage';
import LoadingComponent from '../../components/loading_component/LoadingComponent';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0,
      emailValue: '',
      passwordValue: '',
      userNameValue: null,
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
    this.handleAddressSubmit = this.handleAddressSubmit.bind(this);
    this.receiveAddresses = this.receiveAddresses.bind(this);
    this.toggleFetching = this.toggleFetching.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
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
      .catch(err => receiveErrorMessage(err.message));

    this.emailValue.focus();
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

  validateUsername() {
    if (this.state.userNameValue === null) return;
    return this.state.userNameValue.length > 1 ? 'success' : 'error';
  }    

  handleEmailFormChange() {
    this.setState({
      emailValue: this.emailValue.value,
    });
  }

  handleUserNameFormChange() {
    this.setState({
      userNameValue: this.userNameValue.value,
    });
  }

  handlePasswordFormChange() {
    this.setState({
      passwordValue: this.passwordValue.value,
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const self = this;
    return firebase.auth().createUserWithEmailAndPassword(this.state.emailValue, this.state.passwordValue)
      .then(result => {
        console.log('create user here for some reason????', result);
        const newUser = Object.assign({}, result, {
          displayName: self.state.userNameValue
        });
        self.setState({
          user: newUser,
          currentStep: 1
        });
      })
      .catch(err => self.props.receiveErrorMessage(err.message));
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
        .catch(err => self.props.receiveErrorMessage(err.message));
  }

  receiveAddresses(key, addr) {
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


  render() {
    const { currentStep, fetching } = this.state;
    return <div>
      <h2>Sign Up</h2>
      {
        fetching === true ?
          <LoadingComponent />
        :
        currentStep === 0 ?
          this.renderSignUpForm()
        :
        currentStep === 1 ?
          <div>
            <h4>Set Your Congressional District</h4>
            <p>Congressional districts are based on lines drawn by Congress every 10 years following the results of the census. As a result, a zip code alone is not enough to determine your congressional district.</p>
            <h6>This information will not be shared with anyone.</h6>
            <AddressForm 
              submitAddress={ this.receiveAddresses }
              addresses={ this.state.possibleAddresses }
              toggleIsFetching={ this.toggleFetching }
            />
          </div>
        :
          ''
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
            <form style={{marginBottom: '2em', paddingBottom: '2em', borderBottomStyle: 'solid'}} onSubmit={ this.handleFormSubmit }>
              <FormGroup controlId='signup--email' validationState={ this.validateEmail() }
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
              <FormGroup controlId='signup--username' validationState={ this.validateUsername() }>
                <ControlLabel>User Name</ControlLabel>
                <FormControl
                  type="text"
                  onChange={ this.handleUserNameFormChange }
                  placeholder="user name"
                  inputRef={ ref => this.userNameValue = ref }
                  value={ this.state.userNameValue }
                />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup controlId='signup--password' validationState={ this.validatePassword() }
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
  getAuthUpdate,
  createUser,
  receiveErrorMessage,
  setUserDistrict,
})(SignUp);

