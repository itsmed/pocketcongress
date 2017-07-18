import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import { connect } from 'react-redux';

import { Glyphicon } from 'react-bootstrap';

import {
  getAuthUpdate,
  unauthUser,
} from '../../actions';

import {
  Nav,
  NavItem,
} from 'react-bootstrap';

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
      <Nav bsStyle='tabs' justified>
        <NavItem>
          <Glyphicon glyph="menu-hamburger" />
        </NavItem>
        <NavItem href="/">Landing</NavItem>
        <NavItem href="/floor-items">Floor Items</NavItem>
        {
          user ?
            ''
          :
            <NavItem href="/signup">Sign Up</NavItem>
        }
        {
          user ?
            <NavItem href="/profile">Profile</NavItem>
          : 
            ''
        }
        {
          user ?
            <NavItem onClick={ this.handleSignOut }>Sign out</NavItem>
          :
            <NavItem href="/signin">Sign In</NavItem>
        }
      </Nav>
    </header>;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { getAuthUpdate, unauthUser })(Header);
