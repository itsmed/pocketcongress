import React, { Component } from 'react';

import { connect } from 'react-redux';


import {
  getAuthUpdate,
  unauthUser,
} from '../../actions';

import {
  Nav,
  NavItem,
  Navbar,
} from 'react-bootstrap';

import {
  Link,
} from 'react-router-dom';

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
          <h2>

              <Link to='/'>Pocket Congress</Link>

          </h2>
        
        <Navbar collapseOnSelect>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav bsStyle='tabs' pullLeft justified>
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
          </Navbar.Collapse>
        </Navbar>

    </header>;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { getAuthUpdate, unauthUser })(Header);
