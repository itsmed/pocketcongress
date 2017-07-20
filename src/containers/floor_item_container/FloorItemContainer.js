import React, { Component } from 'react';
import { connect } from 'react-redux';

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

import DateDropDown from '../../components/datedropdown/DateDropDown';
import FloorItemList from '../../components/floor_item_list/FloorItemList';

class FloorItemContainer extends Component {
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
    const reps = Object.keys(this.props.federalReps);
    const { activeChamber } = this.state;

    return <Grid>
      <Row>
        <Col xs={20} xsOffset={1}>
          <h3>Floor Items</h3>
          <p>Items voted on by the {this.state.activeChamber}.</p>
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
        <FloorItemList items={ this.props.floorItems } activeChamber={ this.state.activeChamber } />
      </Row>
    </Grid>;
  }
}

function mapStateToProps(state) {
  return {
    floorItems: state.federalFloorItems,
    date: state.date,
    federalReps: state.federalReps,
  };
}

export default connect(mapStateToProps, { requestFloorItems, setDate })(FloorItemContainer);