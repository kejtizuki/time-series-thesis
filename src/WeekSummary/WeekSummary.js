import React, {createRef} from 'react';
import * as d3 from "d3";
import {scaleLinear, scaleBand, scaleTime, schemeCategory20c, scaleQuantize, scaleOrdinal } from 'd3-scale';
import { select as d3Select } from 'd3-selection'
import moment from 'moment'
import Calendar from './../Calendar/Calendar'
import { Boxplot, computeBoxplotStats } from 'react-boxplot'

// import data from './../data/itching.csv';
// import *  as dataParser from './dataParser.js';

import './weekSummary.scss'



class WeekSummary extends React.Component {

 componentDidUpdate(prevProps) {
   // if (prevProps !== this.props) {
   //   d3.select("svg").selectAll("*").remove();
   //   this.renderBarChart();
   //   // this.renderBarChartBasic();
   // }
 }

 componentDidMount() {
    this.renderWeek();
  }

 renderWeek() {


 }


  render() {

    const values = [
  14,
  15,
  16,
  16,
  17,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  20,
  20,
  21,
  21,
  22,
  23,
  24,
  24,
  29,
 ]

    return(
      <div className="summaryContainer center">

        <Calendar monthData={this.props.monthData}
          weekData={this.props.weekData}
          lineType={this.props.lineType}
          clockConfig={this.props.clockConfig}
          setDay={currentDay => this.props.setDay(currentDay)}
          heatmapChecked={this.props.heatmapChecked}
        />

        {/* <Boxplot
          width={400}
          height={20}
          orientation="horizontal"
          min={14}
          max={29}
          stats={computeBoxplotStats(values)}
        />

        <Boxplot
          width={400}
          height={20}
          orientation="horizontal"
          min={0}
          max={50}
          stats={computeBoxplotStats(values)}
        /> */}

      </div>
    )
  }
}

export default WeekSummary;
