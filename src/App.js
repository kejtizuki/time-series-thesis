import React from 'react';
// import logo from './logo.svg';
import Scatter from './Scatter/Scatter'
import ScatterMY from './ScatterMY/ScatterMY'
import RadialLineChart from './RadialLineChart/RadialLineChart'
// import RadialLineChartLib from './RadialLineChart/RadialLineChartLib'
import BarChart from './BarChart/BarChart'
import Menu from './Menu/Menu'
import * as d3 from "d3";

import data from './data/data-tinnitus.csv';
import *  as dataParser from './dataParser';
import './App.scss';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentDay: '2019-10-02',
      lineType: d3.curveCardinalClosed,
      chartType: 'Radial',
      clockConfig: 'Midnight Up',
      avgWeekday: null
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
        avgWeekday
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

    this.setState(prevState => ({
      ...prevState.lineType,
      ...prevState.lineTypeStr,
      ...prevState.clockConfig,
      currentDay,
      dataDayHours,
      avgWeekday
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
      chartType
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
            />
        }
        </div>
        <div className="chartContainer">
          { this.state.dataDayHours && this.state.chartType === 'Radial' && <RadialLineChart currentDay={this.state.currentDay}
            dataDayHours={this.state.dataDayHours}
            dayInsights={this.state.dayInsights}
            lineType={this.state.lineType}
            clockConfig={this.state.clockConfig}
            avgWeekday={this.state.avgWeekday}
            // mean={this.state.mean}
          />
          }
          {
            this.state.dataDayHours && this.state.chartType === 'BarChart' && <BarChart currentDay={this.state.currentDay}
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
