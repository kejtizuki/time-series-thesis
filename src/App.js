import React from 'react';
// import logo from './logo.svg';
import Scatter from './Scatter/Scatter'
import ScatterMY from './ScatterMY/ScatterMY'
import RadialLineChart from './RadialLineChart/RadialLineChart'
import WeeklyRadial from './WeeklyRadial/WeeklyRadial'
// import RadialLineChartLib from './RadialLineChart/RadialLineChartLib'
import BarChart from './BarChart/BarChart'
import Menu from './Menu/Menu'
import * as d3 from "d3";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import data from './data/itching.csv';
import *  as dataParser from './dataParser';
import './App.scss';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentDay: '2017-03-28',
      lineType: d3.curveCardinalClosed,
      chartType: 'Radial',
      timePeriod: 'Daily',
      clockConfig: 'Midnight Up',
      avgWeekday: null,
      avgMonday: null

    };
  }

  componentDidUpdate(prevProps) {
    // if (prevProps !== this.props) {
    //
    // }
  }

  componentDidMount() {
    d3.csv(data).then(data => {

      const dayInsights = dataParser.getDayInsights(data)
      const weekdayNr = dataParser.getWeekday(this.state.currentDay)

      const allExistingWeekdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, weekdayNr)).length
      console.log('allExistingWeekdays', allExistingWeekdays)

      const avgWeekday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, weekdayNr)), allExistingWeekdays)
      console.log('avgWeekdayXXX', avgWeekday)


      const allExistingMondays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 1)).length
      const allExistingTuesdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 2)).length
      const allExistingWednesdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 3)).length
      const allExistingThursdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 4)).length
      const allExistingFridays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 5)).length
      const allExistingSaturdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 6)).length
      const allExistingSundays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 0)).length

      const avgMonday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 1)), allExistingMondays)
      const avgTuesday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 2)), allExistingTuesdays)
      const avgWednesday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 3)), allExistingWednesdays)
      const avgThursday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 4)), allExistingThursdays)
      const avgFriday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 5)), allExistingFridays)
      const avgSaturday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 6)), allExistingSaturdays)
      const avgSunday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 0)), allExistingSundays)

      console.log('avg Monday ', avgMonday)
      console.log('avg tuesday ', avgTuesday)
      console.log('avg Wednesday ', avgWednesday)

      // console.log('csv', data)
      // console.log("how many in day ", dataParser.howManyInDay(dataParser.parseData(data)))
      // console.log("how many in month ", dataParser.howManyInMonth(dataParser.parseData(data)))
      // console.log("how many weekday in month ", dataParser.howManyWeekDayMonth(dataParser.parseData(data), dataParser.howManyInDay(dataParser.parseData(data))))
      // console.log('day insights', dataParser.getDayInsights(data))
      // console.log('day hours', dataParser.getDayHours(dataParser.getDayInsights(data), this.state.currentDay))

      console.log('weekday ', dataParser.getWeekday(this.state.currentDay))
      // console.log('weekdayInsights ', dataParser.getWeekdayInsights(dayInsights, 3))
      // console.log('Merged data grouped into hours ', dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 3)))
      // console.log('weekday length ', Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 3)).length)
      // console.log('avg weekday - wednesday', dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 3)), allExistingWeekdays))
      // console.log('day hours ARR', dataParser.getDayHoursArr(dataParser.getDayInsights(data), this.state.currentDay))

      // console.log('obj vals', Object.values(dataParser.getDayInsights(data)))

      const dataDayHours = dataParser.getDayHoursArr(dataParser.getDayInsights(data), this.state.currentDay);
      // const mean = dataParser.dayMean(dataDayHours)
      // const dayInsights = dataParser.getDayInsights(data);

      this.setState({
        data,
        dataDayHours,
        dayInsights,
        avgWeekday,
        avgMonday,
        avgTuesday,
        avgWednesday,
        avgThursday,
        avgFriday,
        avgSaturday,
        avgSunday
        // mean
      });
   });
  }

  setDate(date) {
    const currentDay = date;
    const dataDayHours = dataParser.getDayHoursArr(dataParser.getDayInsights(this.state.data), date);

    const dayInsights = dataParser.getDayInsights(this.state.data)
    const weekdayNr = dataParser.getWeekday(date)
    const allExistingWeekdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, weekdayNr)).length
    const avgWeekday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, weekdayNr)), allExistingWeekdays)

    const allExistingMondays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 1)).length
    const allExistingTuesdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 2)).length
    const allExistingWednesdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 3)).length
    const allExistingThursdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 4)).length
    const allExistingFridays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 5)).length
    const allExistingSaturdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 6)).length
    const allExistingSundays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 0)).length

    const avgMonday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 1)), allExistingMondays)
    const avgTuesday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 2)), allExistingTuesdays)
    const avgWednesday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 3)), allExistingWednesdays)
    const avgThursday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 4)), allExistingThursdays)
    const avgFriday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 5)), allExistingFridays)
    const avgSaturday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 6)), allExistingSaturdays)
    const avgSunday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 0)), allExistingSundays)


    this.setState(prevState => ({
      ...prevState.lineType,
      ...prevState.lineTypeStr,
      ...prevState.clockConfig,
      currentDay,
      dataDayHours,
      avgWeekday,
      avgMonday,
      avgTuesday,
      avgWednesday,
      avgThursday,
      avgFriday,
      avgSaturday,
      avgSunday
  }));
  }

  setLineType(lineType, lineTypeStr) {
    this.setState(prevState => ({
      ...prevState.clockConfig,
      lineType,
      lineTypeStr
    }));
  }

  setClockConfig(clockConfig) {
    this.setState({
      clockConfig
    })
  }

  setChartType(chartType) {
    this.setState(prevState => ({
      ...prevState.lineType,
      ...prevState.lineTypeStr,
      ...prevState.currentDay,
      ...prevState.dataDayHours,
      ...prevState.clockConfig,
      ...prevState.avgWeekday,
      ...prevState.avgMonday,
      chartType
    }))
  }

  setTimePeriod(timePeriod) {
    this.setState(prevState => ({
      ...prevState.lineType,
      ...prevState.lineTypeStr,
      ...prevState.currentDay,
      ...prevState.dataDayHours,
      ...prevState.clockConfig,
      ...prevState.avgWeekday,
      ...prevState.avgMonday,
      timePeriod
    }))
  }

  render() {
    return (
      <div className="app">
        <div className="menuContainer">
          {
            this.state.dayInsights &&
            <Menu
              dayInsights={this.state.dayInsights}
              setDate={date => this.setDate(date)}
              setLineType={(lineType, lineTypeStr) => this.setLineType(lineType, lineTypeStr)}
              setClockConfig = {(clockConfig) => this.setClockConfig(clockConfig)}
              configValue = {this.state.clockConfig}
              firstValue={this.state.currentDay}
              secondValue={this.state.lineTypeStr}
              chartType={this.state.chartType}
              setChartType={chartType => this.setChartType(chartType)}
              timePeriod={this.state.timePeriod}
              setTimePeriod={timePeriod => this.setTimePeriod(timePeriod)}
            />
        }
        </div>
        <div className="chartContainer">
        { this.state.dataDayHours && this.state.chartType === 'Radial' && this.state.timePeriod === 'Daily' &&
        <RadialLineChart currentDay={this.state.currentDay}
          dataDayHours={this.state.dataDayHours}
          dayInsights={this.state.dayInsights}
          lineType={this.state.lineType}
          clockConfig={this.state.clockConfig}
          avgWeekday={this.state.avgWeekday}
          // mean={this.state.mean}
        />
        }
        { this.state.dataDayHours && this.state.timePeriod === 'Weekly' &&
        <WeeklyRadial currentDay={this.state.currentDay}
          dataDayHours={this.state.dataDayHours}
          dayInsights={this.state.dayInsights}
          lineType={this.state.lineType}
          clockConfig={this.state.clockConfig}
          avgWeekday={this.state.avgWeekday}
          avgMonday={this.state.avgMonday}
          avgTuesday={this.state.avgTuesday}
          avgWednesday={this.state.avgWednesday}
          avgThursday={this.state.avgThursday}
          // mean={this.state.mean}
        />
        }
          {
            this.state.dataDayHours && this.state.chartType === 'BarChart' && this.state.timePeriod === 'Daily' &&
            <BarChart currentDay={this.state.currentDay}
              dataDayHours={this.state.dataDayHours}
              dayInsights={this.state.dayInsights}
              lineType={this.state.lineType}
              avgWeekday={this.state.avgWeekday}/>
          }
        </div>
      </div>
    );
  }
}


export default App;
