import React from 'react';
// import logo from './logo.svg';
import Scatter from './Scatter/Scatter'
import ScatterMY from './ScatterMY/ScatterMY'
import RadialLineChart from './RadialLineChart/RadialLineChart'
import RadialLineChartLib from './RadialLineChart/RadialLineChartLib'
import Menu from './Menu/Menu'
import * as d3 from "d3";

import data from './data/itching.csv';
import *  as dataParser from './dataParser';
import './App.scss';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentDay: '2017-05-06'
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
    this.setState({
      currentDay,
      dataDayHours
    });
  }

  render() {
    return (
      <div className="app">
        <div className="menuContainer">
          { this.state.dayInsights && <Menu dayInsights={this.state.dayInsights} setDate={date => this.setDate(date)}/> }
        </div>
        <div className="chartContainer">
          { this.state.dataDayHours && <RadialLineChart currentDay={this.state.currentDay} dataDayHours={this.state.dataDayHours} dayInsights={this.state.dayInsights}/>}
        </div>
      </div>
    );
  }
}


export default App;
