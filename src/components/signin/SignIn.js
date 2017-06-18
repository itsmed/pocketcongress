import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authorizeNewUserWithProvider } from '../../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);
  
    this.handleProviderSubmit = this.handleProviderSubmit.bind(this);
  }

  handleProviderSubmit(provider) {
    this.props.authorizeNewUserWithProvider(provider);
  }

  render() {
    return (
      <div>
        SignIn! 
        <button onClick={ () => this.handleProviderSubmit('google')}>Sign In With Google</button>
      </div>
    );
  }
}
const mstp = (state) => ({user: state.user});

export default connect(mstp , { authorizeNewUserWithProvider })(SignIn);