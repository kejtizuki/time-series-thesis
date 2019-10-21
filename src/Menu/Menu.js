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
    if (e.value === 'curveBasisClosed') {
      this.props.setLineType(d3.curveBasisClosed);
    }
    if (e.value === 'curveLinearClosed') {
      this.props.setLineType(d3.curveLinearClosed);
    }

  }


  render() {

    const defaultOption = Object.keys(this.props.dayInsights)[0];
    const lines = ['curveBasisClosed', 'curveLinearClosed']

    return (
      <div className="menu">Day
        <Dropdown options={Object.keys(this.props.dayInsights)} onChange={(e) => this.onDropdownChange(e)} value={defaultOption} placeholder="Select an option" />
        <br />
        Line type
        <Dropdown options={lines} onChange={(e) => this.onLineChange(e)} value={lines[0]} placeholder="Select an option" />
      </div>
    )
  }
}

export default Menu;
