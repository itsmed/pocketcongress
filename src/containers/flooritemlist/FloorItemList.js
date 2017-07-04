import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requestFloorItems } from '../../actions';
import FloorItem from '../../components/flooritem/FloorItem';
import DropDown from '../../components/dropdown/DropDown';
import DateDropDown from '../../components/datedropdown/DateDropDown';


class FloorItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeChamber: 'all',
    };

    this.setActiveChamber = this.setActiveChamber.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(month, year) {
    this.props.requestFloorItems(month, year);  
  }

  setActiveChamber(activeChamber) {
    this.setState({
      activeChamber,
    });
  }

  render() {
    const items = this.props.floorItems;
    console.log('items fucked', items);
    const { activeChamber } = this.state;
    return <div>
      <DropDown
        action={ this.setActiveChamber }
        items={['all', 'house', 'senate']}
      />
      <DateDropDown submit={ this.handleSearch } />
      <ul>
        {
          activeChamber === 'senate' ?
            items.senate.votes
              .filter(vote => vote.bill || vote.nomination).map((vote, i) => <li key={i}><FloorItem item={vote} /></li>)
          : activeChamber === 'house' ?
            items.house.votes
              .filter(vote => vote.bill || vote.nomination).map((vote, i) => <li key={i}><FloorItem item={vote} /></li>)
          :
            [...items.house.votes, ...items.senate.votes]
              .filter(vote => vote.bill || vote.nomination).map((vote, i) => <li key={i}><FloorItem item={vote} /></li>)
        }
      </ul>
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    floorItems: state.federalFloorItems,
  };
}

export default connect(mapStateToProps, { requestFloorItems })(FloorItemList);
