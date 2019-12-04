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

const myColor = scaleLinear()
.range(["white" , "#46a7c4"])
.domain([0,150])

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

  chooseDay(day) {
    this.props.setDay(day);
  }

  backgroundColor(item) {
    return myColor(dataParser.getTotalInDay(dataParser.getDayHoursArr(this.props.monthData, item)))
  }


  render() {

    let scaleDataMonth = [];
    Object.keys(this.props.monthData).map(item => {
      for (let i=0; i < Object.keys(item).length; i++) {
        scaleDataMonth.push(dataParser.groupByHoursArr(this.props.monthData[item])[i].value)
      }
    })

    const firstWeekday = dataParser.getWeekday(Object.keys(this.props.monthData)[0])

    let monthOccurences = []

    Object.keys(this.props.monthData).map(item => {
      console.log(myColor(dataParser.getTotalInDay(dataParser.getDayHoursArr(this.props.monthData, item))))
      monthOccurences.push(dataParser.getTotalInDay(dataParser.getDayHoursArr(this.props.monthData, item)))
    })
    console.log('monthOccurences', monthOccurences)





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
          Object.keys(this.props.monthData).map(item =>
          <div className={'day-wrapper' + ' ' + firstDayClass}
            onClick={() => this.chooseDay(item)}
            data-tip={
              item.split("-")[2] + ' of ' + dataParser.getMonthName(item) + 'Occurences: ' +
              dataParser.getTotalInDay(dataParser.getDayHoursArr(this.props.monthData, item))
            }
            style={{backgroundColor: this.backgroundColor(item, monthOccurences) }}
            // style={{backgroundColor: 'rgb(74, 125, 113)'}}
            >

            <p className="day-nr">{item.split("-")[2]}</p>
            <CalendarRadial currentDay={item}
            dataDayHours={dataParser.getDayHoursArr(this.props.monthData, item)}
            dayInsights={this.props.monthData}
            lineType={this.props.lineType}
            clockConfig={this.props.clockConfig}
            scaleDataMonth={scaleDataMonth}
            />
          </div>
        )}

      </div>
      <ReactTooltip />
    </div>
    )
  }
}

export default Calendar;
