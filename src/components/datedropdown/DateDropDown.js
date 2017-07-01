import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import DropDown from '../dropdown/DropDown';

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let years = [2017, 2016, 2015, 2014];
const now = new Date();

let i = 2013;
while (i > 1930) {
  years.push(i);
  i--;
}

class DateDropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month: now.getMonth() + 1,
      year: now.getFullYear(),
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
    return <div>
      <span>Month</span>
      <DropDown
        items={ months }
        displayIndex={ months[months.indexOf(now.getMonth())] }
        action={ e => this.setStateMonth(e)}
        styles={{maxHeight: '5em', overflow: 'scroll', border: 'solid', width: '4.5em'}}
      />
      <span>Year</span>
      <DropDown
        items={ years }
        action={ e => this.setStateYear(e)}
        styles={{maxHeight: '5em', overflow: 'scroll', border: 'solid', width: '6.5em'}}
      />
      <Button bsSize="large" onClick={ this.handleSubmit }>Search</Button>
    </div>;
  }
}

export default DateDropDown;
