import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Link,
} from 'react-router-dom';

import {
  getAuthUpdate,
  unauthUser,
} from '../../actions';

import {
  Nav,
  NavItem,
  Navbar,
  Col,
} from 'react-bootstrap';

import DistrictInfo from '../../components/district_info/DistrictInfo';

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
    const { user, federalReps, district } = this.props;
    return <header>

        <Link to='/'>
          <h2>Pocket Congress</h2>
        </Link>
        
        <Navbar collapseOnSelect>
          <Navbar.Toggle />
          <Col xsHidden>
            <Navbar.Brand>
              <Link to='/'>
                <img src={require('../../images/ballot_box.jpg')} width='80px'/>
              </Link>
            </Navbar.Brand>
          </Col>
          <Navbar.Collapse>
            <Nav bsStyle='tabs' pullLeft justified>
              <NavItem>
                <Link to="/floor-items">Floor Items</Link>
              </NavItem>
              <NavItem>
                <Link to="/find-reps">Find Reps</Link>
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
      <DistrictInfo federalReps={ federalReps } district={ district } />
    </header>;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    federalReps: state.federalReps,
    district: state.district,
  };
}

export default connect(mapStateToProps, { getAuthUpdate, unauthUser })(Header);
