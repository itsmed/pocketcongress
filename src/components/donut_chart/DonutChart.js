import React, { Component } from 'react';

import './donut_chart.css';

class DonutChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { small } = this.props;
    const halfsize = (this.props.size * 0.5);
    const radius = halfsize - (this.props.strokewidth * 0.5);
    const circumference = 2 * Math.PI * radius;
    const strokeval = ((this.props.value * circumference) / 100);
    const dashval = (strokeval + ' ' + circumference);

    const trackstyle = { strokeWidth: this.props.strokewidth };
    const indicatorstyle = { strokeWidth: this.props.strokewidth, strokeDasharray: dashval };
    const rotateval = 'rotate(-90 '+halfsize+','+halfsize+')';

    return (
      <svg width={this.props.size} height={this.props.size} className="donutchart">
        <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={trackstyle} className="donutchart-track"/>
        <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={indicatorstyle} className="donutchart-indicator"/>
        <text className="donutchart-text" x={halfsize} y={halfsize} style={{textAnchor:'middle'}} >
          <tspan style={ small ? {fontSize: '16px'} : {fontSize: '22px'} }>{this.props.valueLabel + ': ' + this.props.value}</tspan>
          <tspan style={ small ? {fontSize: '10px'} : {fontSize: '14px'} }>%</tspan>
        </text>
      </svg>
    );
  }
};

export default DonutChart;

