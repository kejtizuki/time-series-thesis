import React from 'react';
// import logo from './logo.svg';
import Scatter from './Scatter/Scatter'
import ScatterMY from './ScatterMY/ScatterMY'
import RadialLineChart from './RadialLineChart/RadialLineChart'
import RadialLineChartLib from './RadialLineChart/RadialLineChartLib'
import BarChart from './BarChart/BarChart'
import Menu from './Menu/Menu'
import * as d3 from "d3";

import data from './data/itching.csv';
import *  as dataParser from './dataParser';
import './App.scss';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentDay: '2017-02-25',
      lineType: d3.curveCardinalClosed,
      chartType: 'Radial'
    };
  }

  componentDidMount() {
    d3.csv(data).then(data => {

      // console.log('csv', data)
      // console.log("how many in day ", dataParser.howManyInDay(dataParser.parseData(data)))
      // console.log("how many in month ", dataParser.howManyInMonth(dataParser.parseData(data)))
      // console.log("how many weekday in month ", dataParser.howManyWeekDayMonth(dataParser.parseData(data), dataParser.howManyInDay(dataParser.parseData(data))))
      // console.log('day insights', dataParser.getDayInsights(data))
      // console.log('day hours', dataParser.getDayHours(dataParser.getDayInsights(data), this.state.currentDay))
      // console.log('day hours ARR', dataParser.getDayHoursArr(dataParser.getDayInsights(data), this.state.currentDay))

      // console.log('obj vals', Object.values(dataParser.getDayInsights(data)))

      const dataDayHours = dataParser.getDayHoursArr(dataParser.getDayInsights(data), this.state.currentDay);
      const dayInsights = dataParser.getDayInsights(data);

      this.setState({
        data,
        dataDayHours,
        dayInsights
      });
   });
  }

  setDate(date) {
    const currentDay = date;
    const dataDayHours = dataParser.getDayHoursArr(dataParser.getDayInsights(this.state.data), date);
    this.setState(prevState => ({
      ...prevState.lineType,
      ...prevState.lineTypeStr,
      currentDay,
      dataDayHours
  }));
  }

  setLineType(lineType, lineTypeStr) {
    console.log('set line type ', lineTypeStr)
    this.setState({
      lineType,
      lineTypeStr
    });
  }

  setChartType(chartType) {

    console.log('set chart type ', chartType)
    this.setState(prevState => ({
      ...prevState.lineType,
      ...prevState.lineTypeStr,
      ...prevState.currentDay,
      ...prevState.dataDayHours,
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
            lineType={this.state.lineType}/>
          }
          {
            this.state.dataDayHours && this.state.chartType === 'BarChart' && <BarChart currentDay={this.state.currentDay}
              dataDayHours={this.state.dataDayHours}
              dayInsights={this.state.dayInsights}
              lineType={this.state.lineType}/>
          }
        </div>
      </div>
    );
  }
}


export default App;
