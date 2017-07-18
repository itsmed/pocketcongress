import React, { Component } from 'react';
import { connect } from 'react-redux';

import FloorItem from '../../components/flooritem/FloorItem';
import DateDropDown from '../../components/datedropdown/DateDropDown';

import {
  requestFloorItems,
  setDate,
} from '../../actions';

import {
  DropdownButton,
  MenuItem,
  Grid,
  Col,
  Row,
} from 'react-bootstrap';

class FloorItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeChamber: 'House',
    };

    this.setActiveChamber = this.setActiveChamber.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(month, year) {
    this.props.setDate(month, year);
    this.props.requestFloorItems(month, year);  
  }


  setActiveChamber(activeChamber) {
    this.setState({
      activeChamber: activeChamber.toLowerCase(),
    });
  }

  render() {
    const items = this.props.floorItems;
    const { activeChamber } = this.state;

    return <Grid>
      <Row>
        <Col xs={20} xsOffset={1}>
          <h3>Floor Items</h3>
          <p>Items voted on by the House and Senate.</p>
        </Col>
      </Row>
      <Row>
        <Col xs={10} xsOffset={1} md={3} mdOffset={1}>
          <h6>Chamber</h6>
          <DropdownButton bsStyle={'primary'} title={this.state.activeChamber.toUpperCase()} key={99} id={`split-button-basic-${99}`}>
            <MenuItem onSelect={ this.setActiveChamber } eventKey="House">House</MenuItem>
            <MenuItem onSelect={ this.setActiveChamber } eventKey="Senate">Senate</MenuItem>
          </DropdownButton>
        
        </Col>
        <Col xs={10} xsOffset={1} md={5} mdOffset={1}>
          <DateDropDown 
            submit={ this.handleSearch } 
            month={ this.props.date.month }
            year={ this.props.date.year }
          />
        </Col>
      </Row>

      <Row>
        <ul>
          {
            activeChamber.toLowerCase() === 'senate' ?
              items.senate.votes
                .filter(vote => vote.bill || vote.nomination).map((vote, i) => <li key={i}>
                    <FloorItem
                      chamber='senate'
                      session={ vote.session }
                      item={ vote }
                      rollCall={ vote.roll_call }
                    />
                  </li>)
            :
              items.house.votes
                .filter(vote => vote.bill || vote.nomination).map((vote, i) => <li key={i}>
                    <FloorItem
                      chamber='house'
                      session={ vote.session }
                      item={ vote }
                      rollCall={ vote.roll_call }
                    />
                  </li>)
          }
        </ul>
      </Row>
    </Grid>;
  }
}

function mapStateToProps(state) {
  return {
    floorItems: state.federalFloorItems,
    date: state.date
  };
}

export default connect(mapStateToProps, { requestFloorItems, setDate })(FloorItemList);
