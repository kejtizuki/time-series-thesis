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

    console.log('month', this.props.monthData)

    // Object.keys(this.props.monthData).map(item => console.log(item))

  }

  componentDidUpdate(prevProps) {

    console.log('month', this.props.monthData)

  }


  render() {

    const firstN = (obj, m, n) => {
        return Object.keys(obj) //get the keys out
          .sort() //this will ensure consistent ordering of what you will get back. If you want something in non-aphabetical order, you will need to supply a custom sorting function
          .slice(m, n) //get the first N
          .reduce(function(memo, current) { //generate a new object out of them
            memo[current] = obj[current]
            return memo;
          }, {})
    };

    let firstRow = firstN(this.props.monthData, 0, 7);
    let secondRow = firstN(this.props.monthData, 7, 14);
    let thirdRow = firstN(this.props.monthData, 14, 21);
    let fourthRow = firstN(this.props.monthData, 21, 28);
    let fifthRow = firstN(this.props.monthData, 28, Object.keys(this.props.monthData).length);

    console.log('-------', this.props.monthData);

    // const renderGrid = (rows, cols) => { // 5 x 7
    //   var htmlElements = "";
    //   for (let i = 0; i < rows; i++) {
    //      htmlElements += '<div class="square"></div>';
    //   }
    //   var container = document.getElementById("rn");
    //   container.innerHTML = htmlElements;
    //
    //   for (let i = 0; i < rows; i++) {
    //     debugger;
    //     const grid = document.createElement("div");
    //     grid.className = "square";
    //     document.getElementById("random").append(grid);
    //   }
    // }

    return (
      <div className="calendar" id="random">
        {/* { renderGrid(3, 3) } */}
        {/* {
          Object.keys(this.props.monthData).map(item =>
            <div className="calendar-wrapper">
            <CalendarRadial currentDay={item}
           dataDayHours={dataParser.getDayHoursArr(this.props.monthData, item)}
           dayInsights={this.props.monthData}
           lineType={this.props.lineType}
           clockConfig={this.props.clockConfig}
         />
       </div>
     )} */}

      <div className="row">
      {
        Object.keys(firstRow).map(item =>
          // <div className="calendar-wrapper">
          <CalendarRadial currentDay={item}
         dataDayHours={dataParser.getDayHoursArr(this.props.monthData, item)}
         dayInsights={this.props.monthData}
         lineType={this.props.lineType}
         clockConfig={this.props.clockConfig}
       />
     // </div>
     )
      }
    </div>
    <div className="row">
      {
      Object.keys(secondRow).map(item => <CalendarRadial currentDay={item}
       dataDayHours={dataParser.getDayHoursArr(this.props.monthData, item)}
       dayInsights={this.props.monthData}
       lineType={this.props.lineType}
       clockConfig={this.props.clockConfig}
     />)
    }
  </div>
  <div className="row">
    {
    Object.keys(thirdRow).map(item => <CalendarRadial currentDay={item}
     dataDayHours={dataParser.getDayHoursArr(this.props.monthData, item)}
     dayInsights={this.props.monthData}
     lineType={this.props.lineType}
     clockConfig={this.props.clockConfig}
   />)
  }
  </div>
  <div className="row">
    {
    Object.keys(fourthRow).map(item => <CalendarRadial currentDay={item}
     dataDayHours={dataParser.getDayHoursArr(this.props.monthData, item)}
     dayInsights={this.props.monthData}
     lineType={this.props.lineType}
     clockConfig={this.props.clockConfig}
   />)
  }
  </div>
  <div className="row">
    {
    Object.keys(fifthRow).map(item => <CalendarRadial currentDay={item}
     dataDayHours={dataParser.getDayHoursArr(this.props.monthData, item)}
     dayInsights={this.props.monthData}
     lineType={this.props.lineType}
     clockConfig={this.props.clockConfig}
   />)
  }

  </div>

      </div>
    )
  }
}

export default Calendar;
