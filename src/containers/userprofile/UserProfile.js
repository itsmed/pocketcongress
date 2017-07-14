import React, { Component } from 'react';
import { connect } from 'react-redux';

import RepPreview from '../../components/rep-preview/RepPreview';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    console.log('construction', this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('receiving', nextProps);
  }



  render() {
    const { user, federalReps, district } = this.props;
    console.log('profile props', user);
    return <div>
      <h2>{ user ? user.name : ''} Profile</h2>
      <p>{ user ? user.email : ''}</p>
      <div>
        <h3>District Info</h3>
        {
          district ?
            <div>
              <h4>Congressional District: {`${district.name}, ${user.address.address_components.state}`}</h4>
              <h4>District Number: {district.district_number}</h4>
              <h4>Congress Number: {district.congress_number}</h4>
              <h4>Congress Period: {district.congress_years}</h4>
            </div>
          :
            ''
        }
        <ul>
          {
            user && user.address ?
              Object.keys(user.address.address_components).map((key) => (
                <li key={key}>
                  <label htmlFor={key}>{key}</label>:{'\t'} 
                  <span>{user.address.address_components[key]}</span>
                </li>
              ))
            :
              ''
          }
        </ul>
      </div>
      <div>
        <h3>Federal Representatives</h3>
        <ul>
          {
            Object.values(federalReps).map(rep => <li key={rep.id}>
              <RepPreview rep={rep} />
            </li>)
          }
        </ul>
      </div>
    </div>;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  federalReps: state.federalReps,
  district: state.district.verifiedDistrict,
});

export default connect(mapStateToProps)(UserProfile);
