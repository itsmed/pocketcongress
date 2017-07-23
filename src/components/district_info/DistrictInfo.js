import React from 'react';

import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

import RepPreview from '../rep_preview/RepPreview';

const DistrictInfo = ({district, federalReps}) => {
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
        Object.values(federalReps).map(rep => <Col key={rep.id + 'header+preview'} xs={4}>
          <RepPreview rep={rep} size='small' />
        </Col>)
      }
    </Row>
  </Grid>;
};

export default DistrictInfo;
