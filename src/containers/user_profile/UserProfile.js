import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Row,
  Col,
  Grid,
} from 'react-bootstrap';

import RepPreview from '../../components/rep_preview/RepPreview';
import UserRepComparisonPieGraph from '../../components/user_rep_comparison_pie_graph/UserRepComparisonPieGraph';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
    if (!this.props.user) {
      window.location.replace('/floor-items');
    }
  }

  render() {
    const { user, federalReps, district } = this.props;
    console.log('props usr provil', this.props);
    return <Grid>
      <Row>
        <Col xs={12} md={4}>
          <h2>{ user ? user.name : ''} Profile</h2>
          <p>{ user ? user.email : ''}</p>
        </Col>
      </Row>
      <Row>
      <Col xs={12} md={5} mdOffset={1}>
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
      </Col>
      <Col xs={12} md={5} mdOffset={1}>
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
      </Col>
    </Row>
      <Row>
        <h3>Federal Representatives</h3>
        {
          Object.values(federalReps).map(rep => <Col xs={12} md={4} key={rep.id}>
            <RepPreview rep={rep} />
            <UserRepComparisonPieGraph user={ user } rep={ rep } size={ 300 } />
          </Col>)
        }
      </Row>
    </Grid>;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  federalReps: state.federalReps,
  district: state.district.verifiedDistrict,
});

export default connect(mapStateToProps)(UserProfile);
