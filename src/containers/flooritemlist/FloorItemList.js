import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requestFloorItems } from '../../actions';
import FloorItemPreview from '../../components/flooritempreview/FloorItemPreview';

class FloorItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeChamber: 'all'
    };
  }

  componentWillMount() {
    let now = new Date();
    this.props.requestFloorItems((now.getMonth() + 1), now.getFullYear());
  }

  render() {
    const items = this.props.floorItems;
    const { activeChamber } = this.state;
    return <ul>
      {
        activeChamber === 'senate' ?
          items.senate.votes
            .filter(vote => vote.bill || vote.nomination).map((vote, i) => <li key={i}><FloorItemPreview item={vote} /></li>)
        : activeChamber === 'house' ?
          items.house.votes
            .filter(vote => vote.bill || vote.nomination).map((vote, i) => <li key={i}><FloorItemPreview item={vote} /></li>)
        :
          [...items.house.votes, ...items.senate.votes]
            .filter(vote => vote.bill || vote.nomination).map((vote, i) => <li key={i}><FloorItemPreview item={vote} /></li>)
      }
    </ul>;
  }
}

function mapStateToProps(state) {
  return {
    floorItems: state.federalFloorItems,
  };
}

export default connect(mapStateToProps, { requestFloorItems })(FloorItemList);
