import React, { Component } from 'react';

import {
  Button,
} from 'react-bootstrap';

class DropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      displayIndex: this.props.displayIndex || 0
    };

    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.doAction = this.doAction.bind(this);
  }

  toggleExpanded() {
    this.setState({
      expanded: !this.state.expanded,
    });

  }

  selectItem(displayIndex) {
    this.setState({
      displayIndex
    });
  }

  doAction(item, index) {
    this.selectItem(index);
    this.props.action(item);
  }

  render() {
    const { items } = this.props;
    return <ul onClick={ this.toggleExpanded } style={this.props.styles}>
      {
        this.state.expanded ?
          items.map((item, index) => <li onClick={ () => this.doAction(item, index) } key={index}>
            <Button>{ item }</Button>
          </li>)
        :
          <li onClick={ () => this.doAction(items[this.state.displayIndex], 0) }>
            <Button>{ items[this.state.displayIndex] }</Button>
          </li>
      }
    </ul>;
  }
}

export default DropDown;
