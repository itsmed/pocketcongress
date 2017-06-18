import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);
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
            <li><Link to="/signout">Sign out</Link></li>
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

export default connect(mapStateToProps)(Header);
