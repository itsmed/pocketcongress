import React, { Component } from 'react';

import {
  Button,
} from 'react-bootstrap';

import DropDown from '../drop_down/DropDown';


const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let years = [2017, 2016, 2015, 2014];

let i = 2013;
while (i > 1930) {
  years.push(i);
  i--;
}

class DateDropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month: this.props.month,
      year: this.props.year,
    };

    this.setStateMonth = this.setStateMonth.bind(this);
    this.setStateYear = this.setStateYear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submit(this.state.month, this.state.year);
  }

  setStateMonth(month) {
    return this.setState({month});
  }

  setStateYear(year) {
    return this.setState({year});
  }

  render() {
    return <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
      <div style={{flex: 1}}>
        <h5>Month</h5>
        <DropDown
          items={ months }
          displayIndex={ months.indexOf(this.props.month) }
          action={ e => this.setStateMonth(e)}
          styles={{maxHeight: '10em', overflow: 'scroll',}}
        />
      </div>
      <div style={{flex: 1}}>
        <h5>Year</h5>
        <DropDown
          items={ years }
          action={ e => this.setStateYear(e)}
          displayIndex={ years.indexOf(this.props.year) }
          styles={{maxHeight: '10em', overflow: 'scroll',}}
        />
      </div>
      <Button bsSize="large" onClick={ this.handleSubmit } style={{flex: 1}}>Search</Button>
    </div>;
  }
}

export default DateDropDown;
