import React, { Component } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import * as d3 from "d3";
import * as d3Axis from 'd3-axis'
import { select as d3Select } from 'd3-selection'

import './menu.scss'


class Menu extends Component {


  constructor(props) {
    super(props);
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

  onClockConfigChange(e) {
    if (e.value === 'Midnight Up') {
      this.props.setClockConfig('Midnight Up');
    }
    if (e.value === 'Midnight Down') {
      this.props.setClockConfig('Midnight Down');
    }
  }

  onButtonClick(event) {
    console.log(event.target.name)
    this.props.setChartType(event.target.name)
  }

  changeTimePeriod(event) {
    console.log(event.target.name)
    this.props.setTimePeriod(event.target.name)
  }

  render() {

    const defaultOption = Object.keys(this.props.dayInsights)[0];
    const lines = ['Cardinal', 'Linear', 'Basis', 'Bundle', 'Catmull', 'Natural'];
    const clockConfig = ['Midnight Up', 'Midnight Down']
    const firstValue = this.props.firstValue || defaultOption;
    const secondValue = this.props.secondValue || lines[0];
    const configValue = this.props.configValue || clockConfig[0];

    return (
      <div className="menu">
        <h1>{this.props.timePeriod} insights</h1>
        <div className="btnsHolder">
          Time period
          <br /><br />
          <button className={ (this.props.timePeriod === 'Daily') ? 'btn btn-active-white': 'btn btn-normal-white' }
            onClick={(e) => this.changeTimePeriod(e)}
            name="Daily">Daily</button>
          <button className={ (this.props.timePeriod === 'Weekly') ? 'btn btn-active-white': 'btn-normal-white btn' }
            onClick={(e) => this.changeTimePeriod(e)}
            name="Weekly">Weekly</button>
        </div>
        {
          (this.props.timePeriod === 'Daily') &&
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
        }
        {
          (this.props.chartType === 'Radial' && this.props.timePeriod === 'Daily') &&
          <div>
          Day
          <Dropdown options={Object.keys(this.props.dayInsights)} onChange={(e) => this.onDropdownChange(e)} value={firstValue} placeholder="Select an option" />
          </div>
        }
        {
          (this.props.chartType === 'Radial') && (
          <div>
          <p>Line type</p>
          <Dropdown options={lines} onChange={(e) => this.onLineChange(e)} value={secondValue} placeholder="Select an option" />
          <p>Clock configuration</p>
          <Dropdown options={clockConfig} onChange={(e) => this.onClockConfigChange(e)} value={configValue} placeholder="Select an option" />
          </div>
        )}

      </div>
    )
  }
}

export default Menu;
