import React, { Component } from 'react';

class BillDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('[BILL DETAILS] props', this.props);
    return <div>
      BILL DETAILS
    </div>;
  }
}

export default BillDetails;
