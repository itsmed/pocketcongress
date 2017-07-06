import React, { Component } from 'react';
import { database } from '../../firebase_config';
import { API_BASE } from '../../actions';
import {
  Button,
} from 'react-bootstrap';

import {
  quickSort,
} from '../../actions';

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
  } 

  componentWillMount() { 
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
          .then(data => {return resolve(data)});
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
          ''
      }
    </div>;
  }

  displayBill(bill) {
    const { expanded } = this.state; 
    return <div>
      <div>
        <Button bsStyle="danger">Vote No</Button>
        <Button bsStyle="warning">Abstain</Button>
        <Button bsStyle="success">Vote Yes</Button>
      </div>
      <div>
        <h3>Congress {bill.congress} {bill.bill}</h3>
        <h3>{bill.title}</h3>
        <h3>Sponsor: {bill.sponsor.concat(' ', bill.sponsor_party, ', ', bill.sponsor_state)}</h3>
        <h3>Status: {bill.status}</h3>
        <p>Introduced: { bill.introduced_date }</p>
        <p>Date House Passed: { bill.house_passage_vote }</p>
        <p>Date Senate Passed: { bill.senate_passage_vote }</p>
        <h3>Summary</h3>
        <Button onClick={ this.toggleExpanded }>{expanded ? 'Less' : 'More' }</Button>
        <p>
          { expanded ? bill.summary : bill.summary_short }
        </p>
        {bill.gpo_pdf_uri ? <a target="_blank" rel="noopener noreferrer" href={ bill.gpo_pdf_uri }>Full Bill As PDF</a> : ''}
      </div>
      <h4>Primary Subject: {bill.primary_subject}</h4>
      <h4>Subjects</h4>
      <ul style={{height: '200px', overflow: 'scroll', width: '300px'}}>
        {
          bill.subjects.map(s => <li key={s.url_name}>{s.name}</li>)
        }
      </ul>
      <h4>Actions</h4>
      <ul style={{height: '200px', overflow: 'scroll', width: '300px'}}>
        {
          bill.actions.map(a => <li key={a.date.concat(a.description)}>
            <p>Date: {a.date}</p>
            <p>Description: {a.description}</p>
            <hr />
          </li>)
        }
      </ul>
    </div>;
  }
}

export default BillDetails;
