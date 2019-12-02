import React, { Component } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import * as d3 from "d3";
import * as d3Axis from 'd3-axis'
import { select as d3Select } from 'd3-selection'
import *  as dataParser from '../dataParser.js';
import CalendarRadial from '../CalendarRadial/CalendarRadial'
import ReactTooltip from 'react-tooltip'

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

  chooseDay(day) {
    this.props.setDay(day);
  }


  render() {

    let scaleDataMonth = [];
    Object.keys(this.props.monthData).map(item => {
      for (let i=0; i < Object.keys(item).length; i++) {
        scaleDataMonth.push(dataParser.groupByHoursArr(this.props.monthData[item])[i].value)
      }

    })

    const firstWeekday = dataParser.getWeekday(Object.keys(this.props.monthData)[0])
    console.log('firstWeekday', firstWeekday)

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
              'Day: ' + item.split("-")[2] + ' of ' + dataParser.getMonthName(item)
            }>

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
