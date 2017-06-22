import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  getAuthUpdate,
  unauthUser,
} from '../../actions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    this.props.getAuthUpdate();
  }

  handleSignOut() {
    this.props.unauthUser(this.props.user.id);
  }

  render() {
    const { user } = this.props;
    return <header>
      <ul>
        <li><Link to="/">Landing</Link></li>
        <li><Link to="/floor-items">Floor Items</Link></li>
        {
          user ?
            ''
          :
            <li><Link to="/signup">Sign Up</Link></li>
        }
        {
          user ?
            <li><Link to="/profile">Profile</Link></li>
          : 
            ''
        }
        {
          user ?
            <li onClick={ this.handleSignOut }>Sign out</li>
          :
            <li><Link to="/signin">Sign In</Link></li>
        }
      </ul>

    </header>;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { getAuthUpdate, unauthUser })(Header);
