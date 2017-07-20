import React, { Component } from 'react';

import {
  Link,
} from 'react-router-dom';

import {
  getVotesByDate,
} from '../../actions';

import {
  Button,
  Col,
  Grid,
  Row,
  Well,
} from 'react-bootstrap';

import FloorItemList from '../../components/floor_item_list/FloorItemList';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {
        house: {
          votes: [],
        },
        senate: {
          votes: [],
        },
      },
    };
  }

  componentDidMount() {
    const now = new Date();
    getVotesByDate((now.getMonth() + 1), now.getFullYear())
      .then(res => res.json())
      .then(jsonResponse => {
        console.log('wtf', jsonResponse);
        this.setState({
          items: {
            senate: jsonResponse.Senate,
            house: jsonResponse.House
          }
        });
      });

  }

  render() {
    return <Grid>
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
          <h3>Find Your Representatives</h3>
          <p>Enter the address at which you are registerd to vote or share your location to find you if you are at home, and you will be shown your US Senators and US Congress Person, as well as their contact information.</p>
        </Col>
        <Col xs={12} md={4}>
          <h3>See How They Vote</h3>
          <p>Pocket Congress gives you an easy way to check in on what your elected representatives are voting on each day. Just the bill, ammendment or nomination, and the details. Check up on Congress and see how your representatives vote on each item.</p>
        </Col>
        <Col xs={12} md={4}>
          <h3>Vote and Compare</h3>
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
      <Row>
        <div style={{marginTop: '2em'}}>
          <Well>
            <div style={{ maxHeight: '300px', overflow: 'scroll'}}>
              <Col xs={10} xsOffset={1} md={4}>
                <FloorItemList items={this.state.items} activeChamber={'senate'} />
              </Col>
              <Col xs={10} xsOffset={1} md={4}>
                <FloorItemList items={this.state.items} activeChamber={'house'} />
              </Col>
            </div>
          </Well>
        </div>
      </Row>
      <Row>
        <Link to='/signin'>
          <Button bsStyle='default' block>Sign In</Button>
        </Link>
        <Link to='/signup'>
          <Button bsStyle='info' block>Sign Up</Button>
        </Link>
      </Row>
      {
       /*<Row>
        <Col xs={12} md={4}>
          <h3>Civics 101</h3>
          <p>Did you know that US congressional districts are not based on zip codes, area codes, or county lines. Some states have over 50 districts, and some have only one!</p>
          <p>Instead of a spinning icon to show you that data is loading, you will see informative cards with facts and reminders from Civics class. To go through the cards, click here!</p>
        </Col>
        <Col xs={12} md={4}>
          <h3>See Your District</h3>
          <p>Use the interactive map to see current and past congressional districts. (Coming Soon!)</p>
        </Col>
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
    */}
    </Grid>;
  }
}

export default Landing;