import React, { Component } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import * as d3 from "d3";
import * as d3Axis from 'd3-axis'
import { select as d3Select } from 'd3-selection'
import *  as dataParser from '../dataParser.js';
import CalendarRadial from '../CalendarRadial/CalendarRadial'
import ReactTooltip from 'react-tooltip'
import {scaleLinear, scaleOrdinal} from 'd3-scale';

import './calendar.scss'
var classNames = require('classnames');


class Calendar extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
    // if (prevProps.monthDataAvg !== this.props.monthData) {
    //   d3.select(".calendar-container").selectAll("*").remove();
    //   this.render();
    // }
  }

  chooseDay(e, day) {
    if (e.shiftKey) {
      this.props.setWeek(day);
    }
    else {
      this.props.setDay(day);
    }

  }

  backgroundColor(item) {

    let occurences = []
    Object.values(this.props.dayInsights).forEach(val => occurences.push(val.length))

    const myColor = scaleLinear()
    .range(["white" , "#46a7c4"])
    .domain([0,d3.max(occurences)])

    if (this.props.heatmapChecked === true) {
      return myColor(dataParser.getTotalInDay(dataParser.getDayHoursArr(this.props.monthData, item)))
    }
    else {
      return "white"
    }

  }


  render() {
    let scaleData = [];
    Object.keys(this.props.monthData).map(item => {
      for (let i=0; i < Object.keys(item).length; i++) {
        scaleData.push(dataParser.groupByHoursArr(this.props.monthData[item])[i].value)
      }
    })

    let firstWeekday;
    if (this.props.monthData && !this.props.weekData) {
      firstWeekday = dataParser.getWeekday(Object.keys(this.props.monthData)[0])
    }
    if (this.props.weekData) {
      firstWeekday = dataParser.getWeekday(Object.keys(this.props.weekData)[0])
    }

    let monthOccurences = []

    Object.keys(this.props.monthData).map(item => {
      monthOccurences.push(dataParser.getTotalInDay(dataParser.getDayHoursArr(this.props.monthData, item)))
    })





    const firstDayClass = classNames({
      'monday': firstWeekday === 1,
      'tuesday':  firstWeekday === 2,
      'wednesday':  firstWeekday === 3,
      'thursday':  firstWeekday === 4,
      'friday':  firstWeekday === 5,
      'saturday':  firstWeekday === 6,
      'sunday':  firstWeekday === 0
    });

    return (
      <div className="calendar-container">
      <div className="day-of-week">
        <div className="day">Mo</div>
        <div className="day">Tu</div>
        <div className="day">We</div>
        <div className="day">Th</div>
        <div className="day">Fr</div>
        <div className="day">Sa</div>
        <div className="day">Su</div>
      </div>

      <div className="date-grid" id="random">
        {
          this.props.monthData && !this.props.weekData &&
          Object.keys(this.props.monthData).map(item =>
          <div className={'day-wrapper' + ' ' + firstDayClass}
            onClick={(e) => this.chooseDay(e, item)}
            data-tip={
              item.split("-")[2] + ' of ' + dataParser.getMonthName(item) + '<br /> Occurences: ' +
              dataParser.getTotalInDay(dataParser.getDayHoursArr(this.props.monthData, item))
            }
            style={{backgroundColor: this.backgroundColor(item, monthOccurences) }}
            // style={{backgroundColor: 'rgb(74, 125, 113)'}}
            >

            <p className="day-nr">{item.split("-")[2]}</p>
            {
              (dataParser.getTotalInDay(dataParser.getDayHoursArr(this.props.monthData, item)) !== 0) &&
              <CalendarRadial currentDay={item}
              dataDayHours={dataParser.getDayHoursArr(this.props.monthData, item)}
              dayInsights={this.props.monthData}
              lineType={this.props.lineType}
              clockConfig={this.props.clockConfig}
              scaleData={this.props.allDatasetData}
              // scaleData={scaleData}
              />
            }
            {
              (dataParser.getTotalInDay(dataParser.getDayHoursArr(this.props.monthData, item)) === 0) &&
              <div className="center">
                <img src={require('../assets/empty-light.png')} className="iconCalendar" />
              </div>
            }
          </div>
        )}

        {
          this.props.weekData &&
          Object.keys(this.props.weekData).map(item =>
          <div className={'day-wrapper' + ' ' + firstDayClass}
            onClick={(e) => this.chooseDay(e, item)}
            data-tip={
              item.split("-")[2] + ' of ' + dataParser.getMonthName(item) + '<br /> Occurences: ' +
              dataParser.getTotalInDay(dataParser.getDayHoursArr(this.props.weekData, item))
            }
            style={{backgroundColor: this.backgroundColor(item, monthOccurences) }}
            // style={{backgroundColor: 'rgb(74, 125, 113)'}}
            >

            <p className="day-nr">{item.split("-")[2]}</p>
            {
              (dataParser.getTotalInDay(dataParser.getDayHoursArr(this.props.monthData, item)) !== 0) &&
              <CalendarRadial currentDay={item}
              dataDayHours={dataParser.getDayHoursArr(this.props.weekData, item)}
              dayInsights={this.props.monthData}
              lineType={this.props.lineType}
              clockConfig={this.props.clockConfig}
              scaleData={this.props.allDatasetData}
              />
            }
            {
              (dataParser.getTotalInDay(dataParser.getDayHoursArr(this.props.monthData, item)) === 0) &&
              <img src={require('../assets/empty-light.png')} className="iconCalendar" />
            }
          </div>
        )}

      </div>
      <ReactTooltip multiline={true} />
    </div>
    )
  }
}

export default Calendar;
