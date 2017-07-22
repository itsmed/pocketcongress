import React, { Component } from 'react';
import { database } from '../../firebase_config';

class RepPosition extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repId: '',
      position: ''
    };
  }

  componentWillUnmount() {
    const { congress, chamber, session, rollcall } = this.props;
    database.ref(`votes/${congress}/${chamber}/${session}/${rollcall}`).off();
  }

  componentDidMount() {
    const { congress, chamber, session, rollcall, repId } = this.props;

    const ref = database.ref(`votes/${congress}/${chamber}/${session}/${rollcall}`);

    ref.orderByChild('id').equalTo(repId).once('value', snap => {
      if (snap.val() === null) {
        return;
      }

      this.setState({
        repId,
        position: Object.values(snap.val())[0].position
      });
    });
  }

  render() {
    const { reps } = this.props;
    const { repId } = this.state;

    return <div>
      {
        repId ?
          <div>
            <h4>{reps[repId].role + ' ' + reps[repId].name} Position: { this.state.position }</h4>
          </div>
        :
          <h4>No votes from your representatives yet.</h4>
      }
    </div>;
  }
}

export default RepPosition;
