import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authorizeNewUserWithProvider } from '../../actions';

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
  }

  handleProviderSubmit(provider) {
    this.props.authorizeNewUserWithProvider(provider);
    this.incrementCurrentStep();
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
    e.preventDefault();

    console.log(this.state);
  }

  render() {
    return <div>
    <h3>Sign In</h3>
      <form onSubmit={ this.handleFormSubmit }>
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

export default connect(mapStateToProps , { authorizeNewUserWithProvider })(SignIn);

