import React from 'react';

import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

const Footer = (props) => (
  <footer>
    <Grid>
      <Row>
        <Col xs={12}>
          <p>
            The congressional data comes from the hard working team at <a href="www.propublica.org" rel="noopener" target="_blank">ProPublica</a>, which is a non profit news organization. If you appreciate this service, please consider making a <a href="www.propublica.org/donate" rel="noopener" target="_blank">donation to ProPublica</a>.
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs={4} xsOffset={4}>
          <p>&copy <a href="www.itsmed.github.io" target="_blank" rel="noopener">Dejon Gill</a></p>
        </Col>
      </Row>
    </Grid>
  </footer>
);

export default Footer;
