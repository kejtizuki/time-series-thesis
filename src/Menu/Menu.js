import React, { Component } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import * as d3 from "d3";
import * as d3Axis from 'd3-axis'
import { select as d3Select } from 'd3-selection'
import *  as dataParser from '../dataParser.js';
import shift from '../assets/shift.png'
// import Checkbox from 'react-simple-checkbox';
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';


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
    console.log(dataParser.getMonthNrFromName(e.value))
    this.props.setMonth(dataParser.getMonthNrFromName(e.value), e.value)
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

  checkHeatmap(event) {
    this.props.setHeatmapChecked(event.target.checked)
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
    let months = dataParser.getMonths(this.props.dayInsights)
    months = months.map(item => dataParser.getMonthNameFromMonthNr(item))

    const chosenMonth = this.props.chosenMonth || months[0]


    return (
      <div className="menu">
        <h1>{this.props.timePeriod} insights</h1>
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
          (this.props.chartType === 'WeekAvgRadial' || this.props.chartType === 'WeekSummary') &&
          <div className="btnsHolder">
            Graph type
            <br /><br />
            <button className={ (this.props.chartType === 'WeekSummary') ? 'btn btn-active': 'btn-normal btn' }
              onClick={(e) => this.onButtonClick(e)}
              name="WeekSummary">Summary</button>
            <button className={ (this.props.chartType === 'WeekAvgRadial') ? 'btn btn-active': 'btn btn-normal' }
              onClick={(e) => this.onButtonClick(e)}
              name="WeekAvgRadial">Avg Weekdays</button>
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
          <div class="checkbox">
          <label>
          <Checkbox type="checkbox" value='allDataAvg' checked={this.props.avgAllDataChecked} onChange={(e) => this.checkAvgAllData(e)} />
          &nbsp; Avg weekday from all data
          </label>
          </div>
          <br />
          <label>
          <Checkbox type="checkbox" value='monthDataAvg' checked={this.props.avgMonthDataChecked} onChange={(e) => this.checkAvgMonthData(e)} />
          &nbsp; Avg taken from this month
          </label>
        </div>
      )}
      <br /><br />
      {
        (this.props.chartType === 'Calendar' || this.props.timePeriod === 'Weekly' )&&
        <label className="checkbox-label">
        <Checkbox onChange={(e) => this.checkAvgAllData(e)} checked={this.props.heatmapChecked} onChange={(e) => this.checkHeatmap(e)}/>
          &nbsp;  Show heatmap
        </label>

      }
      {
        (this.props.heatmapChecked && this.props.timePeriod === 'Month') && <div className="legend" />
      }
      {
        this.props.chartType === 'Calendar' &&
        <div className="instructionsContainer">
          <div className="instructions">
            <div className="iconsRow">
              <img src={require("./../assets/tap.png")} alt="shift" className="icon"/>
            </div>
            <div className="instructionsText">Click on a day to see daily overview</div>
          </div>
          <div className="instructions">
            <div className="iconsRow">
              <img src={require("./../assets/tap.png")} alt="shift" className="icon" />
              <div className="iconBetween">+</div>
              <img src={require("./../assets/shift.png")} alt="shift" className="iconHeight" />
            </div>
            <div className="instructionsText">Click + shift key to display weekly overview</div>
          </div>
        </div>
      }

      <div id="theBar"></div>

      </div>
    )
  }
}

export default Menu;
