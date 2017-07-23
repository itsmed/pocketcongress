import React, { Component } from 'react';
import { database } from '../../firebase_config';

class UserPosition extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Loading...'
    };

    this.flag = false;

    this.findVisitorVotes = this.findVisitorVotes.bind(this);
  }

  componentWillUnmount() {
    const { chamber, session, rollcall, congress } = this.props;
    database.ref(`votes/${congress}/${chamber}/${session}/${rollcall}`).off();
  }

  componentWillReceiveProps(nextProps) {
    const { chamber, session, rollcall, user, congress } = nextProps;
    const votePath = `votes/${congress}/${chamber}/${session}/${rollcall}`;
    const vote = nextProps.visitorPositions.find(vote => vote.path === votePath);

    if (vote) {
      this.setState({
        message: vote.position,
      });
      this.flag = true;
    }
  }

  componentDidMount() {
    const { chamber, session, rollcall, user, congress } = this.props;
    const votePath = `votes/${congress}/${chamber}/${session}/${rollcall}`;
    
    if (user) {
      
      const ref = database.ref(votePath);


      ref.on('value', snap => {
        const val = snap.val();
        for (let record in snap.val()) {
          let vote = val[record];

          if (vote.id === user.uid) {

            this.setState({
              message: vote.position,
            });
            this.flag = true;
          }
        }
      });   
    } else {
      this.findVisitorVotes();
    }

    if (!this.flag) {
      this.setState({
        message: 'You haven\'t voted yet.'
      });
    }

  }

  findVisitorVotes() {
    const { chamber, session, rollcall, user, congress } = this.props;
    const votePath = `votes/${congress}/${chamber}/${session}/${rollcall}`;
    const vote = this.props.visitorPositions.find(vote => vote.path === votePath);

    if (vote) {
      this.setState({
        message: vote.position,
      });
      this.flag = true;
    }
  }

  render() {
    return <span>{ this.state.message }</span>;
  }
}

export default UserPosition;
