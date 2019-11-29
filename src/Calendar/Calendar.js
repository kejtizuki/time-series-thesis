import React, { Component } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import * as d3 from "d3";
import * as d3Axis from 'd3-axis'
import { select as d3Select } from 'd3-selection'
import *  as dataParser from '../dataParser.js';
import CalendarRadial from '../CalendarRadial/CalendarRadial'

import './calendar.scss'


class Calendar extends Component {


  constructor(props) {
    super(props);
    console.log('calendar props ', this.props.monthData['2017-03-03'])
    this.state = {
      oneDay: this.props.monthData['2017-03-03']
    }
  }

  componentDidMount() {
    Object.keys(this.props.monthData).map(item => console.log(item))
    // const currentDay = date;
    // const currentMonth = dataParser.getMonth(currentDay)
    // const dataDayHours = dataParser.getDayHoursArr(dataParser.getDayInsights(this.state.data), date);
    //
    // const monthData = dataParser.getMonthInsights(dayInsights, currentMonth)
    //
    // const dayInsights = dataParser.getDayInsights(this.state.data)
    // const weekdayNr = dataParser.getWeekday(date)
    // const allExistingWeekdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, weekdayNr)).length
    // const avgWeekday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, weekdayNr)), allExistingWeekdays)
  }

  componentDidUpdate() {

  }


  render() {

    return (
      <div className="calendar">
        {/* {Object.keys(this.props.monthData).map(item => <CalendarRadial currentDay={item}
          dataDayHours={dataParser.getDayHoursArr(this.props.monthData, item)}
          dayInsights={this.props.monthData}
          lineType={this.props.lineType}
          clockConfig={this.props.clockConfig}
          // avgWeekday={this.state.avgWeekday}
          // avgWeekdayInAMonth={this.state.avgWeekdayInAMonth}
          // minMaxAllData={this.state.minMaxAllData}
          // minMaxWeekdayData={this.state.minMaxWeekdayData}
          // avgAllDataChecked={this.state.avgAllDataChecked}
          // avgMonthDataChecked={this.state.avgMonthDataChecked}
          // mean={this.state.mean}
        />)} */}

        <CalendarRadial currentDay={'2017-03-03'}
          dataDayHours={dataParser.getDayHoursArr(this.props.monthData, '2017-03-03')}
          dayInsights={this.props.monthData}
          lineType={this.props.lineType}
          clockConfig={this.props.clockConfig} />
        <CalendarRadial currentDay={'2017-03-04'}
          dataDayHours={dataParser.getDayHoursArr(this.props.monthData, '2017-03-04')}
          dayInsights={this.props.monthData}
          lineType={this.props.lineType}
          clockConfig={this.props.clockConfig} />
        <CalendarRadial currentDay={'2017-03-05'}
          dataDayHours={dataParser.getDayHoursArr(this.props.monthData, '2017-03-05')}
          dayInsights={this.props.monthData}
          lineType={this.props.lineType}
          clockConfig={this.props.clockConfig} />
          <CalendarRadial currentDay={'2017-03-06'}
            dataDayHours={dataParser.getDayHoursArr(this.props.monthData, '2017-03-06')}
            dayInsights={this.props.monthData}
            lineType={this.props.lineType}
            clockConfig={this.props.clockConfig} />
      </div>
    )
  }
}

export default Calendar;
