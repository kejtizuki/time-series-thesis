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
      currentDay: '2017-03-04',
      lineType: d3.curveCardinalClosed,
      chartType: 'Radial',
      timePeriod: 'Daily',
      clockConfig: 'Midnight Up',
      avgWeekday: null,
      avgMonday: null,
      allAvgValues: null
    };
  }

  componentDidUpdate(prevProps) {
    // if (prevProps !== this.props) {
    //
    // }
  }

  componentDidMount() {
    d3.csv(data).then(data => {

      const currentDay = this.state.currentDay;
      const dayInsights = dataParser.getDayInsights(data)
      const weekdayNr = dataParser.getWeekday(this.state.currentDay)
      const currentMonth = dataParser.getMonth(currentDay)
      const allExistingWeekdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, weekdayNr)).length

      const avgWeekday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, weekdayNr)), allExistingWeekdays)


      const allExistingMondays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 1))
      const allExistingTuesdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 2))
      const allExistingWednesdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 3))
      const allExistingThursdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 4))
      const allExistingFridays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 5))
      const allExistingSaturdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 6))
      const allExistingSundays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 0))

      const avgMonday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 1)), allExistingMondays.length)
      const avgTuesday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 2)), allExistingTuesdays.length)
      const avgWednesday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 3)), allExistingWednesdays.length)
      const avgThursday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 4)), allExistingThursdays.length)
      const avgFriday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 5)), allExistingFridays.length)
      const avgSaturday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 6)), allExistingSaturdays.length)
      const avgSunday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 0)), allExistingSundays.length)

      const allOfThisWeekdayInAMonth = () => {
        if (weekdayNr == 1) {
          return dataParser.filteredByMonth(allExistingMondays, currentMonth)
        }
        if (weekdayNr == 2) {
          return dataParser.filteredByMonth(allExistingTuesdays, currentMonth)
        }
        if (weekdayNr == 3) {
          return dataParser.filteredByMonth(allExistingWednesdays, currentMonth)
        }
        if (weekdayNr == 4) {
          return dataParser.filteredByMonth(allExistingThursdays, currentMonth)
        }
        if (weekdayNr == 5) {
          return dataParser.filteredByMonth(allExistingFridays, currentMonth)
        }
        if (weekdayNr == 6) {
          return dataParser.filteredByMonth(allExistingSaturdays, currentMonth)
        }
        if (weekdayNr == 7) {
          return dataParser.filteredByMonth(allExistingSundays, currentMonth)
        }
      }

      const avgWeekdayInAMonth = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsightsFilteredByMonth(dayInsights, weekdayNr, currentMonth)), allOfThisWeekdayInAMonth.length)

      console.log('avgWeekdayInAMonth', avgWeekdayInAMonth)

      let allAvgValues = []
      avgMonday.map(item => allAvgValues.push(item.value))
      avgTuesday.map(item => allAvgValues.push(item.value))
      avgWednesday.map(item => allAvgValues.push(item.value))
      avgThursday.map(item => allAvgValues.push(item.value))
      avgFriday.map(item => allAvgValues.push(item.value))
      avgSaturday.map(item => allAvgValues.push(item.value))
      avgSunday.map(item => allAvgValues.push(item.value))

      console.log('allAvgValues', allAvgValues)

      // console.log('csv', data)
      // console.log("how many in day ", dataParser.howManyInDay(dataParser.parseData(data)))
      // console.log("how many in month ", dataParser.howManyInMonth(dataParser.parseData(data)))
      // console.log("how many weekday in month ", dataParser.howManyWeekDayMonth(dataParser.parseData(data), dataParser.howManyInDay(dataParser.parseData(data))))
      // console.log('day insights', dataParser.getDayInsights(data))
      // console.log('day hours', dataParser.getDayHours(dataParser.getDayInsights(data), this.state.currentDay))

      // console.log('weekday ', dataParser.getWeekday(this.state.currentDay))

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
        avgSunday,
        allAvgValues,
        avgWeekdayInAMonth
        // mean
      });
   });
  }

  setDate(date) {
    const currentDay = date;
    const currentMonth = dataParser.getMonth(currentDay)
    const dataDayHours = dataParser.getDayHoursArr(dataParser.getDayInsights(this.state.data), date);

    const dayInsights = dataParser.getDayInsights(this.state.data)
    const weekdayNr = dataParser.getWeekday(date)
    const allExistingWeekdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, weekdayNr)).length
    const avgWeekday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, weekdayNr)), allExistingWeekdays)

    const allExistingMondays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 1))
    const allExistingTuesdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 2))
    const allExistingWednesdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 3))
    const allExistingThursdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 4))
    const allExistingFridays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 5))
    const allExistingSaturdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 6))
    const allExistingSundays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 0))

    console.log('weekday insights ', dataParser.getWeekdayInsights(dayInsights, 6))

    const avgMonday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 1)), allExistingMondays.length)
    const avgTuesday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 2)), allExistingTuesdays.length)
    const avgWednesday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 3)), allExistingWednesdays.length)
    const avgThursday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 4)), allExistingThursdays.length)
    const avgFriday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 5)), allExistingFridays.length)
    const avgSaturday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 6)), allExistingSaturdays.length)
    const avgSunday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 0)), allExistingSundays.length)

    let allOfThisWeekdayInAMonth;

    if (weekdayNr == 1) {
      console.log(dataParser.filteredByMonth(allExistingMondays, currentMonth))
      allOfThisWeekdayInAMonth = dataParser.filteredByMonth(allExistingMondays, currentMonth)
    }
    if (weekdayNr == 2) {
      console.log(dataParser.filteredByMonth(allExistingTuesdays, currentMonth))
      allOfThisWeekdayInAMonth = dataParser.filteredByMonth(allExistingTuesdays, currentMonth)
    }
    if (weekdayNr == 3) {
      console.log(dataParser.filteredByMonth(allExistingWednesdays, currentMonth))
      allOfThisWeekdayInAMonth = dataParser.filteredByMonth(allExistingWednesdays, currentMonth)
    }
    if (weekdayNr == 4) {
      console.log(dataParser.filteredByMonth(allExistingThursdays, currentMonth))
      allOfThisWeekdayInAMonth = dataParser.filteredByMonth(allExistingThursdays, currentMonth)
    }
    if (weekdayNr == 5) {
      console.log(dataParser.filteredByMonth(allExistingFridays, currentMonth))
      allOfThisWeekdayInAMonth = dataParser.filteredByMonth(allExistingFridays, currentMonth)
    }
    if (weekdayNr == 6) {
      console.log(dataParser.filteredByMonth(allExistingSaturdays, currentMonth))
      allOfThisWeekdayInAMonth = dataParser.filteredByMonth(allExistingSaturdays, currentMonth)
    }
    if (weekdayNr == 7) {
      console.log(dataParser.filteredByMonth(allExistingSundays, currentMonth))
      allOfThisWeekdayInAMonth = dataParser.filteredByMonth(allExistingSundays, currentMonth)
    }


    console.log('allOfThisWeekdayInAMonth', allOfThisWeekdayInAMonth)

    const avgWeekdayInAMonth = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsightsFilteredByMonth(dayInsights, weekdayNr, currentMonth)), allOfThisWeekdayInAMonth.length)

    console.log('avgWeekdayInAMonth', avgWeekdayInAMonth)

    //All values from avg data pushed to one array
    let allAvgValues = []
    avgMonday.map(item => allAvgValues.push(item.value))
    avgTuesday.map(item => allAvgValues.push(item.value))
    avgWednesday.map(item => allAvgValues.push(item.value))
    avgThursday.map(item => allAvgValues.push(item.value))
    avgFriday.map(item => allAvgValues.push(item.value))
    avgSaturday.map(item => allAvgValues.push(item.value))
    avgSunday.map(item => allAvgValues.push(item.value))

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
      avgSunday,
      allAvgValues,
      avgWeekdayInAMonth
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
      ...prevState.avgWeekdayInAMonth,
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
      ...prevState.avgWeekdayInAMonth,
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
          avgWeekdayInAMonth={this.state.avgWeekdayInAMonth}
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
          avgFriday={this.state.avgFriday}
          avgSaturday={this.state.avgSaturday}
          avgSunday={this.state.avgSunday}
          allAvgValues={this.state.allAvgValues}
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
