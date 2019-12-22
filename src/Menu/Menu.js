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

  backToCalendar() {
    this.props.setCalendarView()
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

    console.log('months', months)

    const chosenMonth = this.props.chosenMonth || months[0]

    console.log('FV', this.props.firstValue)

    const totalInMonthArr = []
    const totalInYearArr = []
    const totalInWeekArr = []
    let totalInMonth = 0
    let totalInYear = 0
    let totalInWeek = 0

    Object.keys(this.props.monthData).map(item => {
      totalInMonthArr.push(dataParser.getTotalInDay(dataParser.getDayHoursArr(this.props.monthData, item)))
    })

    if (this.props.weekData) {
      Object.keys(this.props.weekData).map(item => {
        totalInWeekArr.push(dataParser.getTotalInDay(dataParser.getDayHoursArr(this.props.weekData, item)))
      })
      totalInWeekArr.forEach(elem => {
        totalInWeek = totalInWeek + elem
      })
    }

    totalInMonthArr.forEach(elem => {
      totalInMonth = totalInMonth + elem
    })

    Object.keys(this.props.dayInsights).map(item => {
      totalInYearArr.push(dataParser.getTotalInDay(dataParser.getDayHoursArr(this.props.dayInsights, item)))
    })

    totalInYearArr.forEach(elem => {
      totalInYear = totalInYear + elem
    })


    return (
      <div className="menu">
        {/* <h1>{this.props.timePeriod} insights</h1> */}
        {
          this.props.chartType === 'Calendar' &&
          <h1>{this.props.chosenMonth ? dataParser.getMonthNameFromMonthNr(dataParser.getMonthPlusOne(this.props.firstValue)) : months[0]} insights</h1>

        }
        {
          (this.props.timePeriod === 'Weekly') &&
          <h1>Week {this.props.currentWeekNr}, {dataParser.getMonthNameForWeek(this.props.firstValue)}</h1>
        }
        {
          (this.props.chartType === 'WeekAvgRadial') &&
          <h1>Avarage weekdays in all dataset</h1>
        }

        {
          this.props.chartType === 'Calendar' &&
          <div className="longText">In {this.props.chosenMonth ? dataParser.getMonthNameFromMonthNr(dataParser.getMonthPlusOne(this.props.firstValue)) : months[0]} you had <span className="highlighted">{totalInMonth}</span> symptoms.
          This means that approximately <span className="highlighted">{Math.round((totalInMonth/totalInYear)*100).toFixed(0)}% </span>of your yearly symptoms appeared in this period of time.
          </div>
        }

        {
          (this.props.chartType === 'Calendar' || this.props.chartType === 'WeekAvgRadial') &&
          <div className="btnsHolder">
            <p>Graph type</p>
            <button className={ (this.props.chartType === 'Calendar') ? 'btn btn-active': 'btn-normal btn' }
              onClick={(e) => this.onButtonClick(e)}
              name="Calendar">Calendar</button>
            <button className={ (this.props.chartType === 'WeekAvgRadial') ? 'btn btn-active': 'btn btn-normal' }
              onClick={(e) => this.onButtonClick(e)}
              name="WeekAvgRadial">Avg Weekdays</button>
          </div>
        }

        {
          (this.props.timePeriod === 'Weekly' && this.props.chartType === 'WeekSummary') &&
          <div className="longText">In week {this.props.currentWeekNr} you had <span className="highlighted">{totalInWeek}</span> symptoms.
          This means that approximately <span className="highlighted">{Math.round((totalInWeek/totalInMonth)*100).toFixed(0)}%</span> of {dataParser.getMonthNameForWeek(this.props.firstValue)} symptoms appeared in this period of time.
          This week stands for approx. <span className="highlighted">{Math.round((totalInWeek/totalInYear)*100).toFixed(0)}%</span> of all symptoms.
          </div>
        }
        {
          (this.props.chartType === 'Radial' || this.props.chartType === 'BarChart') &&
          <div className="header">
            <h1 className="dayHeader">{dataParser.getWeekdayName(this.props.firstValue)} </h1>
            <h4>{this.props.firstValue.split("-")[2] + ' of ' + dataParser.getMonthName(this.props.firstValue)}</h4>
          </div>
        }
        {
          (this.props.chartType === 'Radial' || this.props.chartType === 'BarChart') &&
          <div className="longText">On {this.props.firstValue.split("-")[2] + ' of ' + dataParser.getMonthName(this.props.firstValue)} you had <span className="highlighted">{dataParser.getTotalInDay(dataParser.getDayHoursArr(this.props.monthData, this.props.firstValue))}</span> symptoms.
          </div>
        }
        {
          (this.props.chartType === 'Radial' || this.props.chartType === 'BarChart') &&
          <div>
          <div className="btnsHolder">
            <p>Graph type</p>
            <button className={ (this.props.chartType === 'Radial') ? 'btn btn-active': 'btn-normal btn' }
              onClick={(e) => this.onButtonClick(e)}
              name="Radial">Radial</button>
            <button className={ (this.props.chartType === 'BarChart') ? 'btn btn-active': 'btn btn-normal' }
              onClick={(e) => this.onButtonClick(e)}
              name="BarChart">Bar chart</button>
          </div>
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
          <p>Clock configuration</p>
          <Dropdown options={clockConfig} onChange={(e) => this.onClockConfigChange(e)} value={configValue} placeholder="Select an option" />
          </div>
        }
        {
        (this.props.chartType === 'Radial' || this.props.chartType === 'BarChart') && (
        <div className="checkboxContainer">

          <div class="checkbox">
          <label>
          <Checkbox type="checkbox" value='allDataAvg' checked={this.props.avgAllDataChecked} onChange={(e) => this.checkAvgAllData(e)} />
          &nbsp; Avg {dataParser.getWeekdayName(this.props.firstValue)} in all months <span class="dot allMonthsDot"></span>
          </label>
          </div>
          <br />
          <label>
          <Checkbox type="checkbox" value='monthDataAvg' checked={this.props.avgMonthDataChecked} onChange={(e) => this.checkAvgMonthData(e)} />
          &nbsp; Avg {dataParser.getWeekdayName(this.props.firstValue)} in {dataParser.getMonthName(this.props.firstValue)} <span class="dot thisMonthDot"></span>
          </label>
        </div>
      )}
      <br /><br />
      {
        (this.props.chartType === 'Calendar' || this.props.chartType === 'WeekSummary' )&&
        <label className="checkbox-label">
        <Checkbox onChange={(e) => this.checkAvgAllData(e)} checked={this.props.heatmapChecked} onChange={(e) => this.checkHeatmap(e)}/>
          &nbsp;  Show heatmap
        </label>
      }

      {
        ((this.props.chartType === 'Calendar' || this.props.chartType === 'WeekSummary' ) && this.props.heatmapChecked === true)&&
        <div>
        <div className="legend"></div>
        <div className="legendTxt">
          <span className='alignleft'>0</span>
          <span className='alignright'>{d3.max(this.props.occurences) }</span>
        </div>
        <div style={{clear: 'both'}}></div>
      </div>
      }
      {
        (this.props.chartType === 'Calendar' || this.props.chartType === 'Radial' || this.props.chartType === 'WeekSummary')  &&
        <div className="">
          <p>How to read?</p>
          <img src={(require('../assets/legendClock2.png'))} className="legendClock"/>
        </div>
      }
      {
        (this.props.chartType === 'Calendar')  &&
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
            <div className="instructionsText">Press shift key and click to display weekly overview</div>
          </div>
        </div>
      }
      {
        (this.props.chartType === 'WeekAvgRadial') &&
        <div>
        <span className="dot weekdaysDot"></span> Weekdays
        <br /><br />
        <span className="dot weekendDot"></span> Weekend
        </div>
      }

      {/* {
        (this.props.chartType === 'Radial') &&
        <div>
        <div className="gradientLegend"></div>
        <div className="legendTxt">
          <span className='alignleft'>0</span>
          // <span className='alignright'>{dataParser.getTotalInDay(dataParser.getDayHoursArr(this.props.monthData, this.props.firstValue)) }</span>
        </div>
        </div>
      }*/}



      {/* {
        this.props.timePeriod === 'Weekly' &&
        <button onClick={this.backToCalendar()}>back to calendar view</button>
      } */}

      <div id="theBar"></div>

      </div>


    )
  }
}

export default Menu;
