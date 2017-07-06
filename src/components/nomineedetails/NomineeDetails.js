import React, { Component } from 'react';
import { database } from '../../firebase_config';
import {
  Button,
} from 'react-bootstrap';

import {
  quickSort,
} from '../../actions';

class NomineeDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nominee: null,
    };
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

  render() {
    const { nominee } = this.state;
    return <div>
      {
        nominee ?
          <div>
            <div>
              <Button bsStyle="danger">Vote No</Button>
              <Button bsStyle="warning">Abstain</Button>
              <Button bsStyle="success">Vote Yes</Button>
            </div>
            <div>
              <h3>Congress: {nominee.congress}</h3>
              <h4>Status: {nominee.status}</h4>
              <h4>State: {nominee.nominee_state}</h4>
              <h5>{nominee.description}</h5>
              <p>Date Received: {nominee.date_received}</p>
              <p>Latest Action Date: {nominee.latest_action_date}</p>
            </div>
            <h4>Actions</h4>
            <ul style={{height: '200px', overflow: 'scroll', width: '300px'}}>
              {
                nominee.actions.map(a => <li key={a.date.concat(a.description)}>
                  <p>Date: {a.date}</p>
                  <p>Description: {a.description}</p>
                  <hr />
                </li>)
              }
            </ul>
          </div>
        :
          ''
      }
    </div>;
  }
}

export default NomineeDetails;

 