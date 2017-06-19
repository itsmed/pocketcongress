import React from 'react';
import { connect } from 'react-redux';


const UserProfile = ({user}) => (
   <div>
    User Profile! {user ? user.name : ''}
  </div>
);

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(UserProfile);
