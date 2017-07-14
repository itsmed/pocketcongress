import React, { Component } from 'react';
import { database } from '../../firebase_config';

class UserPosition extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Loading...'
    };

  }

  componentDidMount() {
    const { chamber, session, rollcall, user, congress } = this.props;
    const ref = database.ref(`votes/${congress}/${chamber}/${session}/${rollcall}`);

    let flag = false;

    ref.on('value', snap => {

      for (let record in snap.val()) {
        let vote = snap.val()[record];

        if (vote.id === user.uid) {
          this.setState({
            message: vote.position,
          });
          flag = true;
        }
      }

      if (!flag) {
        this.setState({
          message: 'You haven\'t voted yet.'
        });
      }

    });   
  }

  render() {
    return <span>{ this.state.message }</span>;
  }
}

export default UserPosition;
