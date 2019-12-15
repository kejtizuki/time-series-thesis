import React from 'react';
// import logo from './logo.svg';
import Scatter from './Scatter/Scatter'
import ScatterMY from './ScatterMY/ScatterMY'
import RadialLineChart from './RadialLineChart/RadialLineChart'
import WeeklyRadial from './WeeklyRadial/WeeklyRadial'
import WeekSummary from './WeekSummary/WeekSummary'
// import RadialLineChartLib from './RadialLineChart/RadialLineChartLib'
import BarChart from './BarChart/BarChart'
import Menu from './Menu/Menu'
import Calendar from './Calendar/Calendar'
import * as d3 from "d3";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import dataItching from './data/itching.csv';
import dataSymptoms from './data/symptoms.csv';
import dataTinnitus from './data/data-tinnitus.csv';
import dataSugar from './data/data-sugar_craving.csv';

import *  as dataParser from './dataParser';
import './App.scss';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      // currentDay: '2017-03-04',
      lineType: d3.curveCardinalClosed,
      chartType: 'Calendar',
      timePeriod: 'Month',
      clockConfig: 'Midnight Up',
      avgWeekday: null,
      avgMonday: null,
      allAvgValues: null,
      avgMonthDataChecked: true,
      avgAllDataChecked: true,
      dataset: 'itching'
      // monthData: null
    };
  }

  componentDidUpdate(prevProps) {
    // if (prevProps !== this.props) {
    //
    // }
  }

  componentDidMount() {

    // const data = this.state.dataset or ""

    let data;
    if (this.state.dataset === 'itching') {
      data = dataItching
    }
    if (this.state.dataset === 'symptoms') {
      data = dataSymptoms
    }
    if (this.state.dataset === 'tinnitus') {
      data = dataTinnitus
    }
    if (this.state.dataset === 'sugar craving') {
      data = dataSugar
    }

    d3.csv(data).then(data => {

      const dayInsights = dataParser.getDayInsights(data)

      const firstDay = Object.keys(dayInsights)[0]
      const currentDay = firstDay;

      const currentMonth = dataParser.getMonth(currentDay)
      const monthData = dataParser.getMonthInsights(dayInsights, currentMonth)


      const weekdayNr = dataParser.getWeekday(currentDay)

      const dataDayHours = dataParser.getDayHoursArr(dayInsights, currentDay);
      const allExistingWeekdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, weekdayNr)).length

      const avgWeekday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, weekdayNr)), allExistingWeekdays)

      console.log('dataDayHours', dataDayHours)
      console.log('monthData', monthData)

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

      // let allOfThisWeekdayInAMonth;

      const allOfThisWeekdayInAMonth = dataParser.filteredByMonth(Object.keys(dataParser.getFilteredbyWeekday(dayInsights, weekdayNr)), currentMonth);

      const avgWeekdayInAMonth = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsightsFilteredByMonth(dayInsights, weekdayNr, currentMonth)), allOfThisWeekdayInAMonth.length)

      let allAvgValues = []
      avgMonday.map(item => allAvgValues.push(item.value))
      avgTuesday.map(item => allAvgValues.push(item.value))
      avgWednesday.map(item => allAvgValues.push(item.value))
      avgThursday.map(item => allAvgValues.push(item.value))
      avgFriday.map(item => allAvgValues.push(item.value))
      avgSaturday.map(item => allAvgValues.push(item.value))
      avgSunday.map(item => allAvgValues.push(item.value))

      let allDatasetData = []
      Object.keys(dayInsights).map(item => {
        for (let i=0; i < Object.keys(item).length; i++) {
          if (allDatasetData.indexOf(item) === -1) {
            allDatasetData.push(dataParser.groupByHoursArr(dayInsights[item])[i].value)
          }
        }
      })

      console.log(allDatasetData)

      let minMaxAllData = []
      avgWeekday.map(item => minMaxAllData.push(item.value))
      dataDayHours.map(item => minMaxAllData.push(item.value))
      avgWeekdayInAMonth.map(item => minMaxAllData.push(item.value))

      let minMaxWeekdayData = []
      avgWeekday.map(item => minMaxWeekdayData.push(item.value))
      dataDayHours.map(item => minMaxWeekdayData.push(item.value))

      this.setState({
        currentDay,
        firstDay,
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
        avgWeekdayInAMonth,
        minMaxAllData,
        minMaxWeekdayData,
        monthData,
        allDatasetData
        // mean
      });
   });
  }

  setMonth(month, chosenMonth) {


    console.log('set month function', month, chosenMonth)

    const dayInsights = dataParser.getDayInsights(this.state.data)

    const currentMonth = month
    const currentYear = Object.keys(dayInsights)[0].split('-')[0]
    const currentDay = currentYear + '-' + currentMonth + '-01'
    const monthData = dataParser.getMonthInsights(dayInsights, currentMonth)

    let allDatasetData = []
    // Object.keys(dayInsights).map(key => {
    //   Object.values(dataParser.getDayHoursArr(dayInsights, key)).map(val => {
    //     allDatasetData.push(val)
    //   })
    // })

    Object.keys(dayInsights).map(item => {
      for (let i=0; i < Object.keys(item).length; i++) {
        if (allDatasetData.indexOf(item) === -1) {
          allDatasetData.push(dataParser.groupByHoursArr(dayInsights[item])[i].value)
        }
      }
    })

    //log
    let allDatasetDataLog = []
    allDatasetData.map(i => allDatasetDataLog.push(Math.log(i)))

    this.setState(prevState => ({
      chosenMonth,
      currentDay,
      monthData,
      allDatasetData
    }))
  }

  // console.log('log', allDatasetDataLog)

  setDate(date) {
    const currentDay = date;
    const currentMonth = dataParser.getMonth(currentDay)
    const dataDayHours = dataParser.getDayHoursArr(dataParser.getDayInsights(this.state.data), date);

    const dayInsights = dataParser.getDayInsights(this.state.data)
    const weekdayNr = dataParser.getWeekday(date)
    const allExistingWeekdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, weekdayNr)).length
    const avgWeekday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, weekdayNr)), allExistingWeekdays)
    const monthData = dataParser.getMonthInsights(dayInsights, currentMonth)

    const allExistingMondays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 1))
    const allExistingTuesdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 2))
    const allExistingWednesdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 3))
    const allExistingThursdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 4))
    const allExistingFridays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 5))
    const allExistingSaturdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 6))
    const allExistingSundays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, 0))

    console.log('dataDayHours', dataDayHours)
    console.log('monthData', monthData)

    const avgMonday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 1)), allExistingMondays.length)
    const avgTuesday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 2)), allExistingTuesdays.length)
    const avgWednesday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 3)), allExistingWednesdays.length)
    const avgThursday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 4)), allExistingThursdays.length)
    const avgFriday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 5)), allExistingFridays.length)
    const avgSaturday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 6)), allExistingSaturdays.length)
    const avgSunday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, 0)), allExistingSundays.length)

    const allOfThisWeekdayInAMonth = dataParser.filteredByMonth(Object.keys(dataParser.getFilteredbyWeekday(dayInsights, weekdayNr)), currentMonth);

    const avgWeekdayInAMonth = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsightsFilteredByMonth(dayInsights, weekdayNr, currentMonth)), allOfThisWeekdayInAMonth.length)

    //All values from avg data pushed to one array
    let allAvgValues = []
    avgMonday.map(item => allAvgValues.push(item.value))
    avgTuesday.map(item => allAvgValues.push(item.value))
    avgWednesday.map(item => allAvgValues.push(item.value))
    avgThursday.map(item => allAvgValues.push(item.value))
    avgFriday.map(item => allAvgValues.push(item.value))
    avgSaturday.map(item => allAvgValues.push(item.value))
    avgSunday.map(item => allAvgValues.push(item.value))

    //avgAllDataChecked
    //Array of all values from a given weekday taken from current day and avgWeekday values and avgForAMonth
    let minMaxAllData = []
    avgWeekday.map(item => minMaxAllData.push(item.value))
    dataDayHours.map(item => minMaxAllData.push(item.value))
    avgWeekdayInAMonth.map(item => minMaxAllData.push(item.value))

    //avgMonthDataChecked
    let minMaxWeekdayData = []
    avgWeekday.map(item => minMaxWeekdayData.push(item.value))
    dataDayHours.map(item => minMaxWeekdayData.push(item.value))

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
      avgWeekdayInAMonth,
      minMaxAllData,
      minMaxWeekdayData,
      monthData
  }));
  }

  setLineType(lineType, lineTypeStr) {
    this.setState(prevState => ({
      ...prevState.clockConfig,
      lineType,
      lineTypeStr
    }));
  }

  setDataset(dataset) {

    let data;
    if (this.state.dataset === 'itching') {
      data = dataItching
    }
    if (this.state.dataset === 'symptoms') {
      data = dataSymptoms
    }
    if (this.state.dataset === 'tinnitus') {
      data = dataTinnitus
    }
    if (this.state.dataset === 'sugar craving') {
      data = dataSugar
    }

    d3.csv(data).then(data => {
      const dayInsights = dataParser.getDayInsights(data)
      const firstDay = Object.keys(dayInsights)[0]
      const currentDay = firstDay;

      const currentMonth = dataParser.getMonth(currentDay)
      const dataDayHours = dataParser.getDayHoursArr(dataParser.getDayInsights(data), currentDay);

      const weekdayNr = dataParser.getWeekday(currentDay)
      const allExistingWeekdays = Object.keys(dataParser.getFilteredbyWeekday(dayInsights, weekdayNr)).length
      const avgWeekday = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsights(dayInsights, weekdayNr)), allExistingWeekdays)
      const monthData = dataParser.getMonthInsights(dayInsights, currentMonth)

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

      let allOfThisWeekdayInAMonth;

      if (weekdayNr == 1) {
        allOfThisWeekdayInAMonth = dataParser.filteredByMonth(allExistingMondays, currentMonth)
      }
      if (weekdayNr == 2) {
        allOfThisWeekdayInAMonth = dataParser.filteredByMonth(allExistingTuesdays, currentMonth)
      }
      if (weekdayNr == 3) {
        allOfThisWeekdayInAMonth = dataParser.filteredByMonth(allExistingWednesdays, currentMonth)
      }
      if (weekdayNr == 4) {
        allOfThisWeekdayInAMonth = dataParser.filteredByMonth(allExistingThursdays, currentMonth)
      }
      if (weekdayNr == 5) {
        allOfThisWeekdayInAMonth = dataParser.filteredByMonth(allExistingFridays, currentMonth)
      }
      if (weekdayNr == 6) {
        allOfThisWeekdayInAMonth = dataParser.filteredByMonth(allExistingSaturdays, currentMonth)
      }
      if (weekdayNr == 0) {
        allOfThisWeekdayInAMonth = dataParser.filteredByMonth(allExistingSundays, currentMonth)
      }

      const avgWeekdayInAMonth = dataParser.avgWeekdayHours(dataParser.groupByHoursArr(dataParser.getWeekdayInsightsFilteredByMonth(dayInsights, weekdayNr, currentMonth)), allOfThisWeekdayInAMonth.length)

      //All values from avg data pushed to one array
      let allAvgValues = []
      avgMonday.map(item => allAvgValues.push(item.value))
      avgTuesday.map(item => allAvgValues.push(item.value))
      avgWednesday.map(item => allAvgValues.push(item.value))
      avgThursday.map(item => allAvgValues.push(item.value))
      avgFriday.map(item => allAvgValues.push(item.value))
      avgSaturday.map(item => allAvgValues.push(item.value))
      avgSunday.map(item => allAvgValues.push(item.value))

      //Array of all values from a given weekday taken from current day and avgWeekday values and avgForAMonth
      let minMaxAllData = []
      avgWeekday.map(item => minMaxAllData.push(item.value))
      dataDayHours.map(item => minMaxAllData.push(item.value))
      avgWeekdayInAMonth.map(item => minMaxAllData.push(item.value))

      let minMaxWeekdayData = []
      avgWeekday.map(item => minMaxWeekdayData.push(item.value))
      dataDayHours.map(item => minMaxWeekdayData.push(item.value))

      let allDatasetData = []
      Object.keys(dayInsights).map(item => {
        for (let i=0; i < Object.keys(item).length; i++) {
          if (allDatasetData.indexOf(item) === -1) {
            allDatasetData.push(dataParser.groupByHoursArr(dayInsights[item])[i].value)
          }
        }
      })

      console.log(':>', allDatasetData)

      this.setState(prevState => ({
        ...prevState.lineType,
        ...prevState.lineTypeStr,
        ...prevState.clockConfig,
        ...prevState.timePeriod,
        dayInsights,
        avgWeekday,
        avgMonday,
        avgTuesday,
        avgWednesday,
        avgThursday,
        avgFriday,
        avgSaturday,
        avgSunday,
        avgWeekdayInAMonth,
        minMaxAllData,
        minMaxWeekdayData,
        dataDayHours,
        currentDay,
        allAvgValues,
        dataset,
        allDatasetData,
        monthData,
        firstDay
      }))

      // console.log('currentMonth', dataParser.getMonthName(currentMonth));
      console.log('setdataset ', currentMonth, dataParser.getMonthNameFromMonthNr(currentMonth));

      const monthStr = currentMonth < 10 ? `0${currentMonth + 1}` : currentMonth;

      this.setMonth(currentMonth, dataParser.getMonthNameFromMonthNr(currentMonth))
    })


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
      ...prevState.minMaxAllData,
      ...prevState.minMaxWeekdayData,
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
      ...prevState.minMaxAllData,
      ...prevState.minMaxWeekdayData,
      timePeriod
    }))
  }

  setAllDataChecked(avgAllDataChecked) {
      this.setState({
        avgAllDataChecked
      })
  }

  setHeatmapChecked(heatmapChecked) {
    this.setState({
      heatmapChecked
    })
  }

  setMonthDataChecked(avgMonthDataChecked) {
    this.setState(prevState => ({
      ...prevState.lineType,
      ...prevState.lineTypeStr,
      ...prevState.currentDay,
      ...prevState.dataDayHours,
      ...prevState.clockConfig,
      ...prevState.avgWeekday,
      ...prevState.avgMonday,
      ...prevState.avgWeekdayInAMonth,
      ...prevState.minMaxAllData,
      ...prevState.minMaxWeekdayData,
      ...prevState.timePeriod,
      avgMonthDataChecked
    }))
  }

  setDay(currentDay) {
    this.setState({
      chartType: 'Radial',
      timePeriod: 'Daily'
    })
    this.setDate(currentDay)
  }

  setWeek(currentDay) {

    const dayInsights = dataParser.getDayInsights(this.state.data)
    const currentMonth = dataParser.getMonth(currentDay)
    const monthData = dataParser.getMonthInsights(dayInsights, currentMonth)

    const weekData = dataParser.getWeekInsights(currentDay, monthData, dayInsights)

    this.setState({
      monthData,
      weekData,
      chartType: 'WeekSummary',
      timePeriod: 'Weekly'
    })
  }

  render() {
    return (
      <div className="app">
        {
          this.state.dayInsights &&
          <Menu
            dayInsights={this.state.dayInsights}
            setDate={date => this.setDate(date)}
            setLineType={(lineType, lineTypeStr) => this.setLineType(lineType, lineTypeStr)}
            setClockConfig = {(clockConfig) => this.setClockConfig(clockConfig)}
            setDataset={(dataset) => this.setDataset(dataset)}
            datasetValue={this.state.dataset}
            configValue = {this.state.clockConfig}
            firstValue={this.state.currentDay}
            secondValue={this.state.lineTypeStr}
            chartType={this.state.chartType}
            setChartType={chartType => this.setChartType(chartType)}
            timePeriod={this.state.timePeriod}
            setTimePeriod={timePeriod => this.setTimePeriod(timePeriod)}
            avgAllDataChecked={this.state.avgAllDataChecked}
            avgMonthDataChecked={this.state.avgMonthDataChecked}
            setAllDataChecked={avgAllDataChecked => this.setAllDataChecked(avgAllDataChecked)}
            setHeatmapChecked={heatmapChecked => this.setHeatmapChecked(heatmapChecked)}
            heatmapChecked={this.state.heatmapChecked}
            setMonthDataChecked={avgMonthDataChecked => this.setMonthDataChecked(avgMonthDataChecked)}
            setMonth={(month, chosenMonth) => {this.setMonth(month, chosenMonth)}}
            chosenMonth={this.state.chosenMonth}
          />
      }


       {
       this.state.dataDayHours && this.state.chartType === 'Radial' && this.state.timePeriod === 'Daily' &&
      <div className="chartContainer">
       <RadialLineChart currentDay={this.state.currentDay}
         dataDayHours={this.state.dataDayHours}
         dayInsights={this.state.dayInsights}
         lineType={this.state.lineType}
         clockConfig={this.state.clockConfig}
         avgWeekday={this.state.avgWeekday}
         avgWeekdayInAMonth={this.state.avgWeekdayInAMonth}
         minMaxAllData={this.state.minMaxAllData}
         minMaxWeekdayData={this.state.minMaxWeekdayData}
         avgAllDataChecked={this.state.avgAllDataChecked}
         avgMonthDataChecked={this.state.avgMonthDataChecked}
         // mean={this.state.mean}
       />
     </div>
       }
       {
         this.state.dataDayHours && this.state.timePeriod === 'Weekly' && this.state.chartType === 'WeekAvgRadial' &&
         <div className="chartContainer">
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
         </div>
       }

       {
         this.state.dataDayHours && this.state.timePeriod === 'Weekly' && this.state.chartType === 'WeekSummary' &&
         <div className="chartContainer">
         <WeekSummary
           monthData={this.state.monthData}
           weekData={this.state.weekData}
           lineType={this.state.lineType}
           clockConfig={this.state.clockConfig}
           setDay={currentDay => this.setDay(currentDay)}
           heatmapChecked={this.state.heatmapChecked}
           allDatasetData={this.state.allDatasetData}
           dayInsights={this.state.dayInsights}
           // currentDay={this.state.currentDay}
           // dataDayHours={this.state.dataDayHours}
           // dayInsights={this.state.dayInsights}
           // lineType={this.state.lineType}
           // clockConfig={this.state.clockConfig}
           // avgWeekday={this.state.avgWeekday}
           // avgMonday={this.state.avgMonday}
           // avgTuesday={this.state.avgTuesday}
           // avgWednesday={this.state.avgWednesday}
           // avgThursday={this.state.avgThursday}
           // avgFriday={this.state.avgFriday}
           // avgSaturday={this.state.avgSaturday}
           // avgSunday={this.state.avgSunday}
           // allAvgValues={this.state.allAvgValues}
           // mean={this.state.mean}
         />
         </div>
       }

       {
         this.state.dataDayHours && this.state.chartType === 'BarChart' && this.state.timePeriod === 'Daily' &&
         <div className="chartContainer">
         <BarChart currentDay={this.state.currentDay}
           dataDayHours={this.state.dataDayHours}
           dayInsights={this.state.dayInsights}
           lineType={this.state.lineType}
           avgWeekday={this.state.avgWeekday}
           avgWeekdayInAMonth={this.state.avgWeekdayInAMonth}
           minMaxAllData={this.state.minMaxAllData}
           minMaxWeekdayData={this.state.minMaxWeekdayData}
           avgAllDataChecked={this.state.avgAllDataChecked}
           avgMonthDataChecked={this.state.avgMonthDataChecked}
         />
       </div>
       }



         {
          this.state.monthData && this.state.currentDay && this.state.chartType === 'Calendar' &&
          <div className="calendarContainer">
          <Calendar
            dayInsights={this.state.dayInsights}
            monthData={this.state.monthData}
            lineType={this.state.lineType}
            clockConfig={this.state.clockConfig}
            setDay={currentDay => this.setDay(currentDay)}
            setWeek={currentDay => this.setWeek(currentDay)}
            heatmapChecked={this.state.heatmapChecked}
            allDatasetData={this.state.allDatasetData}/>
          </div>
        }

        </div>

    );
  }
}


export default App;
