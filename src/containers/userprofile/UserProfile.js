import React, { Component } from 'react';
import { connect } from 'react-redux';


class UserProfile extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('receiving', nextProps);
  }

  

  render() {
    const { user } = this.props;
    console.log('profile props', user);
    return <div>
      {
        JSON.stringify(user)
      }
    </div>;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(UserProfile);
