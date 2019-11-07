import React, { Component } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import * as d3 from "d3";
import * as d3Axis from 'd3-axis'
import { select as d3Select } from 'd3-selection'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import './menu.scss'

class Menu extends Component {

  constructor() {
    super();
    this.state = {
      chartType: 'Radial'
    }
  }

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
    if (e.value === 'Bundle') {
      this.props.setLineType(d3.curveBundle, 'Bundle');
    }
    if (e.value === 'Cardinal') {
      this.props.setLineType(d3.curveCardinalClosed, 'Cardinal');
    }
    if (e.value === 'Catmull') {
      this.props.setLineType(d3.curveCatmullRomClosed, 'Catmull');
    }
    if (e.value === 'Natural') {
      this.props.setLineType(d3.curveNatural, 'Natural');
    }
  }

  onButtonClick(event) {
    console.log(event.target.name)
    this.props.setChartType(event.target.name)
  }

  render() {

    const defaultOption = Object.keys(this.props.dayInsights)[0];
    const lines = ['Linear', 'Basis', 'Bundle', 'Cardinal', 'Catmull', 'Natural'];
    const firstValue = this.props.firstValue || defaultOption;
    const secondValue = this.props.secondValue || lines[0];

    return (
      <div className="menu">
        <h1>Daily insights</h1>
        <div className="btnsHolder">
          Graph type
          <br /><br />
          <button className={ (this.props.chartType === 'Radial') ? 'btn btn-active': 'btn-normal btn' }
            onClick={(e) => this.onButtonClick(e)}
            name="Radial">Radial</button>
          <button className={ (this.props.chartType === 'BarChart') ? 'btn btn-active': 'btn btn-normal' }
            onClick={(e) => this.onButtonClick(e)}
            name="BarChart">Bar chart</button>
        </div>
        Day
        <Dropdown options={Object.keys(this.props.dayInsights)} onChange={(e) => this.onDropdownChange(e)} value={firstValue} placeholder="Select an option" />
        <br />
        Line type
        <Dropdown options={lines} onChange={(e) => this.onLineChange(e)} value={secondValue} placeholder="Select an option" />
      </div>
    )
  }
}

export default Menu;
