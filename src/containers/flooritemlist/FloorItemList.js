import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requestFloorItems } from '../../actions';
import FloorItem from '../../components/flooritem/FloorItem';
import DropDown from '../../components/dropdown/DropDown';

class FloorItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeChamber: 'all',
    };

    this.setActiveChamber = this.setActiveChamber.bind(this);
  }

  componentWillMount() {
    let now = new Date();
    this.props.requestFloorItems((now.getMonth() + 1), now.getFullYear());
  }

  setActiveChamber(activeChamber) {
    this.setState({
      activeChamber,
    });
  }

  render() {
    const items = this.props.floorItems;
    const { activeChamber } = this.state;
    return <div>
      <DropDown
        action={ this.setActiveChamber }
        items={['all', 'house', 'senate']}
      />
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
