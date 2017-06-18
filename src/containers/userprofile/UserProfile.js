import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAuthUpdate } from '../../actions';

class UserProfile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.getAuthUpdate();
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

export default connect(mapStateToProps, { getAuthUpdate })(UserProfile);
