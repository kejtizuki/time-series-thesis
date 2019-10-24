import React, { Component } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import * as d3 from "d3";
import * as d3Axis from 'd3-axis'
import { select as d3Select } from 'd3-selection'

import './menu.scss'

class Menu extends Component {
  componentDidMount() {

  }

  componentDidUpdate() {

  }

  onDropdownChange(e) {
    this.props.setDate(e.value);
  }

  onLineChange(e) {
    if (e.value === 'Basis') {
      this.props.setLineType(d3.curveBasisClosed, 'Basis');
    }
    if (e.value === 'Linear') {
      this.props.setLineType(d3.curveLinearClosed, 'Linear');
    }

  }


  render() {

    const defaultOption = Object.keys(this.props.dayInsights)[0];
    const lines = ['Linear', 'Basis'];
    const firstValue = this.props.firstValue || defaultOption;
    const secondValue = this.props.secondValue || lines[0];

    return (
      <div className="menu">Day
        <Dropdown options={Object.keys(this.props.dayInsights)} onChange={(e) => this.onDropdownChange(e)} value={firstValue} placeholder="Select an option" />
        <br />
        Line type
        <Dropdown options={lines} onChange={(e) => this.onLineChange(e)} value={secondValue} placeholder="Select an option" />
      </div>
    )
  }
}

export default Menu;
