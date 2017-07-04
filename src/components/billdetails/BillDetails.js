import React, { Component } from 'react';
import { database } from '../../firebase_config';

class BillDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { congress, id } = this.props.match.params;
    console.log('will mount,', congress, id, database);
    database.ref(`bills/${congress}/${id}`)
      .once('value', snap => {
        console.log('this' ,this.props, snap.val());
      })
      .catch(err => console.log('why?', err.message));
  }

  render() {
    return <div>
      BILL DETAILS {this.props.match.params.id + ' ' + this.props.match.params.congress}
    </div>;
  }
}

export default BillDetails;
