import React from 'react';

import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

import RepPreview from '../rep_preview/RepPreview';
import UserRepComparisonPieGraph from '../user_rep_comparison_pie_graph/UserRepComparisonPieGraph';

const DistrictInfo = ({district, federalReps, user}) => {
  return <Grid>
    <Row>
      {
        district.verifiedDistrict ?
          <Col xs={12}>
            <h6>{`${district.verifiedDistrict.name}, ${district.verifiedDistrict.congress_number} Congress. ${district.verifiedDistrict.congress_years}`} </h6>
        </Col>
        :
          ''
      }
    </Row>
    <Row>
      {
        Object.values(federalReps).map(rep => <Col key={rep.id + 'header+preview'} xs={12} md={4}>
          <RepPreview rep={rep} size='small' />
          {
            user ? <UserRepComparisonPieGraph user={ user } rep={ rep } size={ 100 } strokeWidth={ 3 } /> : ''
          }
        </Col>)
      }
      {
        user ? '' : <h6>Sign In or Sign Up to Track Your Congress Persons and compare voting records!</h6>
      }
    </Row>
  </Grid>;
};

export default DistrictInfo;
