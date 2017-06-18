import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      User Profile!
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(UserProfile);
