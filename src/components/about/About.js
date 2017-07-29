import React from 'react';

import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';

const About = (props) => (
  <div>
    <Grid>
      <Row>
        <Col xs={12}>
          <h2>Pocket Congress</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h4>Congress Works For You</h4>
          <p>Pocket Congress is a web app that aims to increase voter knowledge and participation by providing an easy way to view, track, and compare your elected representatives' voting records to your own preferences.</p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <h3>Inspiration</h3>
          <p>After being assigned to a mid-term election voter guide for my college newspaper, I have remained interested in the policies that are set by our elected representatives. As time progressed, I looked for a tool that would help me keep track of the policies and positions that my representatives take, so as to be a more informed voter.</p>
          <p>Seeing as how I am not an active social media user, and most tools I found to track Congress required integrating a social media account, I decided to take action and build that tool myself.</p>
        </Col>
        <Col xs={12} md={6}>
          <h3>Data Sources</h3>
          <p>Information about the legislative items and nominations that appear before Congress come from the non-profit organization <a href="http://www.propublica.org/donate" target="_blank" rel="noopener">Propublica</a>.</p>
          <p>Other data comes from the <a href="https://geocod.io/" target="_blank" rel="noopener">Geocodio API</a> as well as the <a href="https://developers.google.com/civic-information/" target="_blank" rel="noopener">Google Civic Information API</a>.</p>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h3>Purpose</h3>
          <p>Pocket Congress is intended for your education only. All attempts are made to maintain correct data, but no guarantees of accuracy are made. ( For example, congressional districts may change ) If you find an error, please report it.</p>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h3>Promise</h3>
          <p>None of your data is ever shared with anyone. This includes when you vote on a bill or nomination. This app does not inform your representatives of your opinons, you still need to call them!</p>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default About;