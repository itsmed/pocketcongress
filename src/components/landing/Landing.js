import React from 'react';

import {
  Button,
  Col,
  Grid,
  Row,
} from 'react-bootstrap';

import {
  Link,
} from 'react-router-dom';

const Landing = () => (
  <Grid>
    <Row>
      <Col xs={12} md={4} mdOffset={4}>
        <h1>Pocket Congress</h1>
      </Col>
      <Col xs={12}>
        <h4>Helping you keep Congress accountable without the hype.</h4>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={4}>
        <h3>Civics 101</h3>
        <p>Did you know that US congressional districts are not based on zip codes, area codes, or county lines. Some states have over 50 districts, and some have only one!</p>
        <p>Instead of a spinning icon to show you that data is loading, you will see informative cards with facts and reminders from Civics class. To go through the cards, click here!</p>
      </Col>
      <Col xs={12} md={4}>
        <h3>See Your District</h3>
        <p>Use the interactive map to see current and past congressional districts. (Coming Soon!)</p>
      </Col>
      <Col xs={12} md={4}>
        <h3>Find Your Representatives</h3>
        <p>Enter the address at which you are registerd to vote (or a near by business, as long as it's in the same district!) or allow location services to find you if you are at home, and you will be shown your US Senators and US Congress Person, as well as their contact information.</p>
      </Col>
    </Row>
    <Row>
      <Link to='/signin'>
        <Button bsStyle='default' block>Sign In</Button>
      </Link>
      <Link to='/signup'>
        <Button bsStyle='info' block>Sign Up</Button>
      </Link>
    </Row>
    <Row>
      <Col xs={12} md={4}>
        <h3>See What They Vote On</h3>
        <p>Congress writes the bills (laws), approves federal nominees, and controls the national budget. The President signs the bills into law, nominates people to federal posts, and is the Commander in Chief of the US armed services. The Supreme Court ensures that laws adhere to the US Constitution.</p>
        <p>Of course all three branches have other duties and powers, such as the a president issuing an executive order. Coupled with sports, the arts, and other topics, it can be overwhelming keeping up on current events, especially what our elected representatives are voting on each day that isn't sensational enough to become a headline.</p>
        <p>Pocket Congress gives you an easy way to check in on what your elected representatives are voting on each day. Just the bill, ammendment or nomination, and the details.</p>
      </Col>
      <Col xs={12} md={4}>
        <h3>See How They Vote</h3>
        <p>Come election day, remembering how elected representatives voted in the middle of their terms on issues that affect our lives can be difficult. So your representative's vote histroy is available for you to scroll through.</p>
      </Col>
      <Col xs={12} md={4}>
        <h3>Vote and Compare</h3>
        <p>What better way to keep track of how you feel about your elected representatives over the course of their term than to vote on the bills, ammendments, and nominations yourself?</p>
        <p>Vote and see how your representatives voted on the same items, then see how often you agree with the representatives.</p>
      </Col>
    </Row>
    <Row>
      <Link to='/signin'>
        <Button bsStyle='default' block>Sign In</Button>
      </Link>
      <Link to='/signup'>
        <Button bsStyle='info' block>Sign Up</Button>
      </Link>
    </Row>
    <div>
      <h3>Planned Features Coming Soon</h3>
      <p>If you'd like to request a feature, please click here.</p>
      <p>We're working on lots of features, here are a few:</p>
      <ul>
        <li>District Map</li>
        <li>State and local legislatures</li>
      </ul>
      <p>More coming soon!</p>
    </div>
  </Grid>
);

export default Landing;