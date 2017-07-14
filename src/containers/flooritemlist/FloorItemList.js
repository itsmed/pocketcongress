import React, { Component } from 'react';
import { connect } from 'react-redux';

import FloorItem from '../../components/flooritem/FloorItem';
import DropDown from '../../components/dropdown/DropDown';
import DateDropDown from '../../components/datedropdown/DateDropDown';

import {
  requestFloorItems,
  setDate,
} from '../../actions';

class FloorItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeChamber: 'house',
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

    return <div>
      <DropDown
        action={ this.setActiveChamber }
        items={['House', 'Senate']}
      />
      <DateDropDown 
        submit={ this.handleSearch } 
        month={ this.props.date.month }
        year={ this.props.date.year }
      />
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
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    floorItems: state.federalFloorItems,
    date: state.date
  };
}

export default connect(mapStateToProps, { requestFloorItems, setDate })(FloorItemList);
