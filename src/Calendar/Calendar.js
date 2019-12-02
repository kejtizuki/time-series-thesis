import React, { Component } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import * as d3 from "d3";
import * as d3Axis from 'd3-axis'
import { select as d3Select } from 'd3-selection'
import *  as dataParser from '../dataParser.js';
import CalendarRadial from '../CalendarRadial/CalendarRadial'

import './calendar.scss'
var classNames = require('classnames');

class Calendar extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      d3.select("svg").selectAll("*").remove();
      this.render();
    }
  }

  chooseDay(day) {
    this.props.setDay(day);
  }


  render() {
    //
    // const firstN = (obj, m, n) => {
    //     return Object.keys(obj) //get the keys out
    //       .sort() //this will ensure consistent ordering of what you will get back. If you want something in non-aphabetical order, you will need to supply a custom sorting function
    //       .slice(m, n) //get the first N
    //       .reduce(function(memo, current) { //generate a new object out of them
    //         memo[current] = obj[current]
    //         return memo;
    //       }, {})
    // };
    //
    // let firstRow = firstN(this.props.monthData, 0, 7);
    // let secondRow = firstN(this.props.monthData, 7, 14);
    // let thirdRow = firstN(this.props.monthData, 14, 21);
    // let fourthRow = firstN(this.props.monthData, 21, 28);
    // let fifthRow = firstN(this.props.monthData, 28, Object.keys(this.props.monthData).length);

    console.log('this.props.monthData', this.props.monthData)

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
      {/* <div className="day-of-week">
        <div className="day">Mo</div>
        <div className="day">Tu</div>
        <div className="day">We</div>
        <div className="day">Th</div>
        <div className="day">Fr</div>
        <div className="day">Sa</div>
        <div className="day">Su</div>

      </div> */}

      <div className="date-grid" id="random">
        {
          Object.keys(this.props.monthData).map(item =>
          <div className={'day-wrapper' && firstDayClass} onClick={() => this.chooseDay(item)}>
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
    </div>
    )
  }
}

export default Calendar;
