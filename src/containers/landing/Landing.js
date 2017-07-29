import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Link,
} from 'react-router-dom';

import {
  requestFloorItems,
  receiveErrorMessage,
  acknowledgeErrorMessage,
} from '../../actions';

import {
  Button,
  Col,
  Grid,
  Row,
  Well,
} from 'react-bootstrap';

import ErrorMessage from '../../components/error_message/ErrorMessage';
import FloorItemList from '../../components/floor_item_list/FloorItemList';

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const now = new Date();
    return this.props.requestFloorItems((now.getMonth() + 1), now.getFullYear());
  }

  render() {
    return <Grid>
      <Row>
        <Col xs={12} md={4} mdOffset={4}>
          <h1>Pocket Congress</h1>
        </Col>
        <Col xs={12}>
          <h4>Congress Works For You</h4>
          <p>Pocket Congress is a web app that aims to increase voter knowledge and participation by providing an easy way to view, track, and compare your elected representatives' voting records to your own preferences.</p>
        </Col>
        <Col xs={12} md={10} mdOffset={1}>
          <p>It can be easy to decide who to vote for, but it can be hard to remember what their positions are and why you're voting for them.</p>
          <p>Since how our elected representatives vote on legislation and nominees affects our lives more than their campaign speeches, Pocket Congress helps you keep track of the positions that your elected representatives take when they vote on in the US Senate and US House of Representatives.</p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={4}>
          <h3>See Your Representatives</h3>
          <p>Enter the address at which you are registerd to vote or share your location if you are at home, and you will be shown your US Senators and US Congress Person, as well as their contact information.</p>
        </Col>
        <Col xs={12} md={4}>
          <h3>See What They Vote On</h3>
          <p>See the bills, ammendments and nominations that have been voted on in the US House of Representatives and the US Senate. Click on the "More" button to get the details on the nominee or legislative item, as well as to see how your representatives voted.</p>
        </Col>
        <Col xs={12} md={4}>
          <h3>See How Your Prefreneces Compare</h3>
          <p>You can "vote" to express your opinion on the legislation. This information is not shared with anyone (so call your Senators and Representatives!). Visit your profile page to see how often you agree or disagree with your elected representatives.</p>
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
          <div>
            {
              this.props.errorMessage ?

                <ErrorMessage
                  acknowledgeErrorMessage={ this.props.acknowledgeErrorMessage } 
                  errorMessage={ this.props.errorMessage } 
                />

              :
                <div>
                  <Col xs={10} xsOffset={1} md={4}>
                     <Well>
                        <div style={{ maxHeight: '300px', overflow: 'scroll' }}>
                          <FloorItemList items={this.props.floorItems } activeChamber={'senate'} isFetching={ this.props.isFetching } acknowledgeErrorMessage={ this.props.acknowledgeErrorMessage } errorMessage={ this.props.errorMessage } />
                        </div>
                      </Well>
                    </Col>
                    <Col xs={10} xsOffset={1} md={4}>
                      <Well>
                        <div style={{ maxHeight: '300px', overflow: 'scroll' }}>
                          <FloorItemList items={this.props.floorItems } activeChamber={'house'} isFetching={ this.props.isFetching } acknowledgeErrorMessage={ this.props.acknowledgeErrorMessage } errorMessage={ this.props.errorMessage } />
                        </div>
                      </Well>
                    </Col>
                </div>
            }
          </div>
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

const mapStateToProps = (state) => ({
  floorItems: state.federalFloorItems,
  errorMessage: state.errorMessage,
  isFetching: state.isFetching,
});

export default connect(mapStateToProps, {
  requestFloorItems,
  receiveErrorMessage,
  acknowledgeErrorMessage,
})(Landing);