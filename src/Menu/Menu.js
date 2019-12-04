import React, { Component } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import * as d3 from "d3";
import * as d3Axis from 'd3-axis'
import { select as d3Select } from 'd3-selection'
import *  as dataParser from '../dataParser.js';

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

  onMonthChange(e) {
    console.log(e.value)
    this.props.setMonth(e.value)
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

  onDatasetChange(e) {
    if (e.value === 'itching') {
      this.props.setDataset('itching');
    }
    if (e.value === 'symptoms') {
      this.props.setDataset('symptoms');
    }
    if (e.value === 'tinnitus') {
      this.props.setDataset('tinnitus');
    }
    if (e.value === 'sugar craving') {
      this.props.setDataset('sugar craving');
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
    this.props.setChartType(event.target.name)
  }

  changeTimePeriod(event) {
    this.props.setTimePeriod(event.target.name)
  }

  checkAvgAllData(event) {
    this.props.setAllDataChecked(event.target.checked)
  }

  checkAvgMonthData(event) {
    this.props.setMonthDataChecked(event.target.checked)
  }

  render() {
    const defaultOption = Object.keys(this.props.dayInsights)[0];
    const lines = ['Cardinal', 'Linear', 'Basis', 'Bundle', 'Catmull', 'Natural'];
    const clockConfig = ['Midnight Up', 'Midnight Down']
    const firstValue = this.props.firstValue || defaultOption || this.props.firstDay;
    const secondValue = this.props.secondValue || lines[0];
    const configValue = this.props.configValue || clockConfig[0];
    const datasets = ['itching', 'symptoms', 'tinnitus', 'sugar craving']
    const datasetValue = this.props.datasetValue || datasets[0]

    console.log(' dataParser.getMonths(this.props.dayInsights)',  dataParser.getMonths(this.props.dayInsights))
    const months = dataParser.getMonths(this.props.dayInsights)

    const chosenMonth = months[0]


    return (
      <div className="menu">
        <h1>{this.props.timePeriod} insights</h1>

        <p>Dataset</p>
        <Dropdown options={datasets} onChange={(e) => this.onDatasetChange(e)} value={datasetValue} placeholder="Select an option" />
        <br />
        {
          (this.props.chartType === 'Radial' || this.props.chartType === 'BarChart') &&
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
        }
        {
          (this.props.chartType === 'Radial' || this.props.chartType === 'BarChart') &&
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
          (this.props.chartType === 'Radial' || this.props.chartType === 'BarChart' && this.props.timePeriod === 'Daily') &&
          <div>
          <p>Day</p>
          <Dropdown options={Object.keys(this.props.dayInsights)} onChange={(e) => this.onDropdownChange(e)} value={firstValue} placeholder="Select an option" />
          </div>
        }
        {
          (this.props.chartType === 'Calendar') &&
          <div>
          <p>Month</p>
          <Dropdown options={months} onChange={(e) => this.onMonthChange(e)} value={chosenMonth} placeholder="Select an option" />
          </div>
        }
        {
          (this.props.chartType === 'Radial') &&
          <div>
          <p>Line type</p>
          <Dropdown options={lines} onChange={(e) => this.onLineChange(e)} value={secondValue} placeholder="Select an option" />
          <p>Clock configuration</p>
          <Dropdown options={clockConfig} onChange={(e) => this.onClockConfigChange(e)} value={configValue} placeholder="Select an option" />
          </div>
        }
        {
        (this.props.chartType === 'Radial' || this.props.chartType === 'BarChart') && (
        <div>
          <p>Avg period</p>
          <label>
          <input type="checkbox" value='allDataAvg' checked={this.props.avgAllDataChecked} onChange={(e) => this.checkAvgAllData(e)} />
          Avg weekday from all data
          </label>
          <br />
          <label>
          <input type="checkbox" value='monthDataAvg' checked={this.props.avgMonthDataChecked} onChange={(e) => this.checkAvgMonthData(e)} />
          Avg taken from this month
          </label>
        </div>
      )}
      <br /><br />
      {
        this.props.chartType === 'Calendar' &&
        <label>
        <input type="checkbox" value='allDataAvg' checked={this.props.avgAllDataChecked} onChange={(e) => this.checkAvgAllData(e)} />
        Show heatmap
        </label>
      }

      </div>
    )
  }
}

export default Menu;
