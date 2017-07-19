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
              <NavItem>
                <Link to='/'>Landing</Link>
              </NavItem>
              <NavItem>
                <Link to="/floor-items">Floor Items</Link>
              </NavItem>
              {
                user ?
                  ''
                :
                  <NavItem>
                    <Link to="/signup">Sign Up</Link>
                  </NavItem>
              }
              {
                user ?
                  <NavItem>
                    <Link to="/profile">Profile</Link>
                  </NavItem>
                : 
                  ''
              }
              {
                user ?
                  <NavItem onClick={ this.handleSignOut }>Sign out</NavItem>
                :
                  <NavItem>
                    <Link to="/signin">Sign In</Link>
                  </NavItem>
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
