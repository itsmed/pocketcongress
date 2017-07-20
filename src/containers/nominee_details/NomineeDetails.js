import React, { Component } from 'react';
import { connect } from 'react-redux';
import { database } from '../../firebase_config';

import {
  quickSort,
  handleUserVote,
} from '../../actions';

import {
  Row,
  Col,
  Grid,
} from 'react-bootstrap';

import UserPosition from '../../components/user_position/UserPosition';
import UserVoteInput from '../../components/user_vote_input/UserVoteInput';
import RepPosition from '../../components/rep_position/RepPosition';

class NomineeDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nominee: null,
    };

    this.handleVote = this.handleVote.bind(this);
  }

  componentWillUnmount() {
    const { congress, id } = this.props.match.params;
    database.ref(`bills/${congress}/${id}`).off();
  }

  componentWillMount() {
    const { congress, id } = this.props.match.params;
    return new Promise((resolve, reject) => {
      database.ref(`nominees/${congress}/${id}`).once('value', snap => {
        if (snap.val() === null) {
          return;
        }
        let newState = {
          nominee: Object.assign({}, snap.val(), {
            actions: snap.val().actions.map(a => ({
              date: a.date,
              description: a.description,
              day: a.date.split('-').slice(2, 3).pop(),
              month: a.date.split('-').slice(1, 2).pop(),
              year: a.date.split('-').slice(0, 1).pop()
            }))
          })
        };
        return resolve(newState);

      })
      .catch(err => Promise.reject(err));
    })
    .then(obj => {
      obj.nominee.actions = quickSort(obj.nominee.actions, (a, b) => (+a.month >= +b.month)).reverse();
      this.setState(obj);
    })
    .catch(err => console.log(err));
  }

  handleVote(congress, position) {
    if (this.props.user) {
      const { chamber, session, rollcall } = this.props.match.params;

      return handleUserVote(this.props.user.uid, congress, chamber, session, rollcall, position);
    }
  }

  render() {
    const { nominee } = this.state;
    const reps = Object.keys(this.props.federalReps);
    const { chamber, session, rollcall, congress } = this.props.match.params;
    return <div>
      {
        nominee ?
          <Grid>
            <div className='background__grey'>
              <Row>
                  <Col xs={12}>
                    <h4>Your Position: <UserPosition
                      user={this.props.user}
                      chamber={chamber}
                      session={session}
                      rollcall={rollcall}
                      congress={congress}
                    />
                  </h4>
                  </Col>
                  <Col xs={12}>
                    {
                      reps.map(repId => <RepPosition
                        repId={repId}
                        key={repId}
                        congress={congress}
                        chamber={chamber}
                        session={session}
                        rollcall={rollcall}
                        reps={this.props.federalReps}
                      />)
                    }
                  </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <UserVoteInput congress={ congress } voteAction={ this.handleVote } />
                </Col>
              </Row>
            </div>
            <Row>
              <Col xs={12} md={4} mdOffset={2}>
                <h3>Congress: {nominee.congress}</h3>
                <h4>Status: {nominee.status}</h4>
                <h4>State: {nominee.nominee_state}</h4>
                <h5>{nominee.description}</h5>
                <p>Date Received: {nominee.date_received}</p>
                <p>Latest Action Date: {nominee.latest_action_date}</p>
              </Col>
              <Col xs={12} md={4}>
                <h4>Actions</h4>
                <ul style={{height: '200px', overflow: 'scroll', borderWidth: '1px', borderStyle: 'solid', textAlign: 'center'}}>
                  {
                    nominee.actions.map(a => <li key={a.date.concat(a.description)}>
                      <p>Date: {a.date}</p>
                      <p>Description: {a.description}</p>
                      <hr />
                    </li>)
                  }
                </ul>
              </Col>
            </Row>
          </Grid>
        :
          <h1>Loading...</h1>
      }
    </div>;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  federalReps: state.federalReps
});

export default connect(mapStateToProps)(NomineeDetails);

 