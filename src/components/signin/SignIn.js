import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authorizeNewUserWithProvider, getAuthUpdate } from '../../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);
  
    this.handleProviderSubmit = this.handleProviderSubmit.bind(this);
  }

  componentDidMount() {
    // this.props.getAuthUpdate();
  }

  handleProviderSubmit(provider) {
    this.props.authorizeNewUserWithProvider(provider);
  }

  render() {
    return (
      <div>
        <button onClick={ () => this.handleProviderSubmit('google')}>Sign In With Google</button>
      </div>
    );
  }
}
const mstp = (state) => ({user: state.user});

export default connect(mstp , { authorizeNewUserWithProvider, getAuthUpdate })(SignIn);