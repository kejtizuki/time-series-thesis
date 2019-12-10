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
   let data = [
    {"letter": "A", "higher": .08,"lower": .05},
    {"letter": "B", "higher": .05,"lower": .03},
    {"letter": "C", "higher": .04,"lower": .02},
    {"letter": "D", "higher": .08,"lower": .05},
    {"letter": "E", "higher": .05,"lower": .03},
    {"letter": "F", "higher": .04,"lower": .02},
    {"letter": "G", "higher": .03,"lower": .02}
   ];

   var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 910 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

   var x = scaleBand()
       .range([0, width])
       .round(.1);

   var y = scaleLinear()
       .range([height, 0]);

   var xAxis = d3.axisBottom(x)

   var yAxis = d3.axisLeft(y)
       .ticks(10);

   var svg = d3.select(this.refs.boxSvg)
     .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

     x.domain(data.map(function(d) { return d.letter; }));
     y.domain([0, d3.max(data, function(d) { return d.higher; })]);

     svg.append("g")
         .attr("class", "x axis")
         .attr("transform", "translate(0," + height + ")")
         .call(xAxis);

     svg.append("g")
         .attr("class", "y axis")
         .call(yAxis)
       .append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", ".71em")
         .style("text-anchor", "end")
         .text("higher");

     svg.selectAll(".bar")
         .data(data)
       .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return x(d.letter); })
         .attr("width", 30)
         .attr("y", function(d) { return y(d.higher); })
         .attr("fill", "#06AD8A")
         .attr("height", function(d) { return height - y(d.higher-d.lower); });


 }


  render() {

    return(
      <div className="summaryContainer center">

        <Calendar monthData={this.props.monthData}
          weekData={this.props.weekData}
          lineType={this.props.lineType}
          clockConfig={this.props.clockConfig}
          setDay={currentDay => this.props.setDay(currentDay)}
          heatmapChecked={this.props.heatmapChecked}
        />

        <svg ref="boxSvg" width={910} height={400}></svg>

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
