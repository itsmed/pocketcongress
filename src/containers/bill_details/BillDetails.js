import React, { Component } from 'react';
import { connect } from 'react-redux';
import { database } from '../../firebase_config';

import {
  API_BASE,
  quickSort,
  handleUserVote,
} from '../../actions';
  
import {
  Button,
  Row,
  Col,
  Grid,
} from 'react-bootstrap';


import RepPosition from '../../components/rep_position/RepPosition';
import UserPosition from '../../components/userposition/UserPosition';
import UserVoteInput from '../../components/uservoteinput/UserVoteInput';

class BillDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bill: null,
      expanded: false,
      pdf: false,
    };

    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.displayBill = this.displayBill.bind(this);
    this.handleVote = this.handleVote.bind(this);
  } 

  componentWillUnmount() {
    const { congress, id } = this.props.match.params;
    database.ref(`bills/${congress}/${id}`).off();
  }

  componentDidMount() { 
    const { congress, id } = this.props.match.params;
    database.ref(`bills/${congress}/${id}`).once('value', snap => {
      return new Promise((resolve, reject) => {
        if (snap.val() === null) {
          fetch(API_BASE.concat(`/api/votes/specific-bill/${congress}/${id}`), {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(data => resolve(data));
        } else {
          let newState = {
            bill: Object.assign({}, snap.val(), {
              actions: Array.isArray(snap.val().actions) ? 
                snap.val().actions.map(a => ({
                  chamber: a.chamber,
                  date: a.datetime,
                  description: a.description,
                  day: a.datetime.split('-').slice(2, 3).pop(),
                  month: a.datetime.split('-').slice(1, 2).pop(),
                  year: a.datetime.split('-').slice(0, 1).pop()
                }))
              :
                []
            })
          };
          return resolve(newState);
        }
      })
      .then(obj => {
        obj.bill.actions = quickSort(obj.bill.actions, (a, b) => (+a.month >= +b.month)).reverse();
        this.setState(obj);
      })
      .catch(err => console.log(err));
    });
  }

  handleVote(congress, position) {
    if (this.props.user) {
      const { chamber, session, rollcall } = this.props.match.params;

      return handleUserVote(this.props.user.uid, congress, chamber, session, rollcall, position);
    }
  }

  toggleExpanded() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    const { bill } = this.state;
    return <div>
      {
        bill ?
          this.displayBill(bill)
        :
          <h1>Loading...</h1>
      }
    </div>;
  }

  displayBill(bill) {
    const { chamber, session, rollcall } = this.props.match.params;
    const reps = Object.keys(this.props.federalReps);
    const { expanded } = this.state;

    return <Grid>
      <div className='background__grey'>
        <Row>
          <Col xs={12}>
            <UserVoteInput congress={ bill.congress } voteAction={ this.handleVote } />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <h4>Your Position: <UserPosition
                user={this.props.user}
                chamber={chamber}
                session={session}
                rollcall={rollcall}
                congress={bill.congress}
              />
            </h4>
          </Col>
          <Col xs={12}>
            {
              reps.map(repId => <RepPosition
                repId={repId}
                key={repId}
                congress={bill.congress}
                chamber={chamber}
                session={session}
                rollcall={rollcall}
                reps={this.props.federalReps}
              />)
            }
          </Col>
        </Row>
      </div>
      <Row>
        <Col xs={12} md={4}>
          <h3>Congress {bill.congress} {bill.bill}</h3>
          <h3>{bill.title}</h3>
          <h3>Sponsor: {bill.sponsor.concat(' ', bill.sponsor_party, ', ', bill.sponsor_state)}</h3>
          <h3>Status: {bill.status}</h3>
          <p>Introduced: { bill.introduced_date }</p>
          <p>Date House Passed: { bill.house_passage_vote }</p>
          <p>Date Senate Passed: { bill.senate_passage_vote }</p>
        </Col>
        <Col xs={12} md={4}>
          <h4>Primary Subject: {bill.primary_subject}</h4>
          <h4>Subjects</h4>
          <ul style={{height: '200px', overflow: 'scroll', borderWidth: '1px', borderStyle: 'solid', textAlign: 'center'}}>
            {
              bill.subjects.map(s => <li key={s.url_name}>{s.name}</li>)
            }
          </ul>
        </Col>
        <Col xs={12} md={4}>
          <h4>Actions</h4>
          <ul style={{height: '200px', overflow: 'scroll', borderWidth: '1px', borderStyle: 'solid', textAlign: 'center'}}>
            {
              bill.actions.map(a => <li key={a.date.concat(a.description)}>
                <p>Date: {a.date}</p>
                <p>Description: {a.description}</p>
                <hr />
              </li>)
            }
          </ul>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h3>Summary</h3>
          <Button onClick={ this.toggleExpanded }>{expanded ? 'Less' : 'More' }</Button>
          <p>
            { expanded ? bill.summary : bill.summary_short }
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          {
            bill.gpo_pdf_uri ? 
              <a 
                target="_blank" 
                rel="noopener noreferrer" 
                href={ bill.gpo_pdf_uri }
              >Full Bill As PDF</a>
            : ''
          }
        </Col>
      </Row>
    </Grid>;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  federalReps: state.federalReps,
});

export default connect(mapStateToProps)(BillDetails);

