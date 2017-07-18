import React, { Component } from 'react';
import { database as db } from '../../firebase_config';

import {
  Button,
  ButtonGroup,
} from 'react-bootstrap';

import DonutChart from '../donut_chart/DonutChart';


class UserRepComparisonPieGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userVotes: {},
      repVotes: {},
      valueLabel: 'Agree',
    };

    this.handleValueLabelChange = this.handleValueLabelChange.bind(this);
  }

  handleValueLabelChange(valueLabel) {
    this.setState({ valueLabel });
  }

  componentDidMount() {
    const { user, rep } = this.props;

    db.ref(`users/${user.uid}/voted_on`).once('value').then(snap => {
      const votePaths = snap.val();

      return votePaths;
    })
    .then(paths => {
      let total = 0;
      for (let dbID in paths) {
        let path = paths[dbID];
        
        db.ref(path).orderByChild('id').equalTo(rep.id).once('value').then(snapshot => {
          if (snapshot.val() !== null) {
            total++;
            const vote = Object.values(snapshot.val()).pop();
            vote.path = path;
            const newRepVotes = Object.assign({}, this.state.repVotes);
            newRepVotes[path] = vote;
            
            const newState = {};
            newState.repVotes = newRepVotes;
            newState.userVotes = this.state.userVotes;
            newState.valueLabel = this.state.valueLabel;

            this.setState(newState);

          }
          console.log(total);
        });

        db.ref(path).orderByChild('id').equalTo(user.uid).once('value').then(snapshot => {


          if (snapshot.val() !== null) {

            const vote = Object.values(snapshot.val()).pop();
            vote.path = path;
            const newUserVotes = Object.assign({}, this.state.userVotes);
            newUserVotes[path] = vote;

            const newState = Object.assign({}, this.state, {
              userVotes: newUserVotes,
            });

            this.setState(newState);
          }
          
        });

      }
    });
  }

  render() {
    const sharedVotePaths = Object.keys(this.state.userVotes).filter(path => path in this.state.repVotes);
    const repVotes = [];
    const userVotes = [];
    let agree = 0;
    let disagree = 0;
    sharedVotePaths.forEach(path => {
      if (path in this.state.userVotes && path in this.state.repVotes) {
        repVotes.push(this.state.repVotes[path]);
        userVotes.push(this.state.userVotes[path]);
        if (this.state.repVotes[path].position.toLowerCase() === this.state.userVotes[path].position.toLowerCase()) {
          agree++;
        } else {
          disagree++;
        }
      }
    });
    
    const averageAgree = Math.round((agree / userVotes.length) * 100);
    const averageDisagree = Math.round((disagree / userVotes.length) * 100);
    const average = this.state.valueLabel === 'Agree' ? averageAgree : averageDisagree;
    return <div>
      <ButtonGroup>
        <Button onClick={ () => this.handleValueLabelChange('Agree') }>Agree</Button>
        <Button onClick={ () => this.handleValueLabelChange('Disagree') }>Disagree</Button>
      </ButtonGroup>
      <DonutChart
        value={ average || 0 }
        valueLabel={ `Out of ${sharedVotePaths.length} vote${sharedVotePaths.length !== 1 ? 's' : ''}, ${this.state.valueLabel}` }
        size={ this.props.size }
        strokewidth={ 10 }
      />
    </div>;
  }
}

export default UserRepComparisonPieGraph;
