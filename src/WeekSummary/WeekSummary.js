import React, {createRef} from 'react';
import * as d3 from "d3";
import {scaleLinear, scaleBand, scaleTime, schemeCategory20c, scaleQuantize, scaleOrdinal } from 'd3-scale';
import { select as d3Select } from 'd3-selection'
import moment from 'moment'
import Calendar from './../Calendar/Calendar'
import { Boxplot, computeBoxplotStats } from 'react-boxplot'

// import data from './../data/itching.csv';
import *  as dataParser from '../dataParser.js';

import './weekSummary.scss'



class WeekSummary extends React.Component {

 componentDidUpdate(prevProps) {

 }

 componentDidMount() {

   console.log('week data', this.props.weekData)

   let dataArr = [];
   Object.keys(this.props.weekData).map(i => {
     const dailyHours = dataParser.getDayHoursArr(this.props.weekData, i);
     for (let j = 0; j < dailyHours.length; j++) {
       let k = dailyHours[j].value;
       while(k > 0) {
         dataArr.push({
           day: i,
           hour: dailyHours[j].key
         });
         k--;
       }
     }
   })

   this.renderWeek(dataArr, this.props.weekData);
 }

 make_x_gridlines(x) {
     return d3.axisBottom(x)
         .ticks(7)
 }

 // gridlines in y axis function
 make_y_gridlines(y) {
     return d3.axisLeft(y)
         .ticks(12)
 }


 renderWeek(dataArr, weekData) {

  const data = dataArr;


  var margin = {top: 10, right: 30, bottom: 30, left: 20},
  width = 980 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;



  // append the svg object to the body of the page
  var svg = d3.select("#violinPlot")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  // Build and Show the Y scale
  var y = d3.scaleLinear()
    .domain([ 0, 26 ])          // Note that here the Y scale is set manually
    .range([height, 0])
  svg.append("g").call( d3.axisLeft(y).tickValues([2,4,6,8,10,12,14,16,18,20,22,24]) )

  // Build and Show the X scale. It is a band scale like for a boxplot: each group has an dedicated RANGE on the axis. This range has a length of x.bandwidth
  var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(Object.keys(weekData))
    .padding(0.6)
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

    // add the X gridlines
   svg.append("g")
       .attr("class", "grid")
       .attr("transform", "translate(0," + height + ")")
       .call(this.make_x_gridlines(x)
           .tickSize(-height)
           .tickFormat("")
       )

   // add the Y gridlines
   svg.append("g")
       .attr("class", "grid")
       .call(this.make_y_gridlines(y)
           .tickSize(-width)
           .tickFormat("")
       )

  // Features of the histogram
  var histogram = d3.histogram()
      .domain(y.domain())
      .thresholds(y.ticks(24))    // Important: how many bins approx are going to be made? It is the 'resolution' of the violin plot
      .value(d => d)

  // Compute the binning for each group of the dataset
  var sumstat = d3.nest()  // nest function allows to group the calculation per level of a factor
    .key(function(d) { return d.day;})
    .rollup(function(d) {   // For each key..
      const input = d.map(function(g) { return g.hour.toString();})    // Keep the variable called Sepal_Length
      const bins = histogram(input)   // And compute the binning on it.
      return(bins)
    })
    .entries(data)

  // What is the biggest number of value in a bin? We need it cause this value will have a width of 100% of the bandwidth.
  var maxNum = 0
  for (let i in sumstat ){
    const allBins = sumstat[i].value
    const lengths = allBins.map(function(a){return a.length;})
    const longuest = d3.max(lengths)
    if (longuest > maxNum) { maxNum = longuest }
  }

  // The maximum width of a violin must be x.bandwidth = the width dedicated to a group
  var xNum = d3.scaleLinear()
    .range([0, x.bandwidth()])
    .domain([-maxNum,maxNum])

  // Add the shape to this svg!
  svg
    .selectAll("myViolin")
    .data(sumstat)
    .enter()        // So now we are working group per group
    .append("g")
      .attr("transform", function(d){ return("translate(" + x(d.key) +" ,0)") } ) // Translation on the right to be at the group position
    .append("path")
        .datum(function(d){ return(d.value)})     // So now we are working bin per bin
        .style("stroke", "none")
        .style("fill","#17c19a")
        .attr("d", d3.area()
            .x0(function(d){ return(xNum(-d.length)) } )
            .x1(function(d){ return(xNum(d.length)) } )
            .y(function(d){ return(y(d.x0)) } )
            .curve(d3.curveCatmullRom)    // This makes the line smoother to give the violin appearance. Try d3.curveStep to see the difference
        )

 }


  render() {

    return(
      <div className="summaryContainer center">

        <Calendar
          dayInsights={this.props.dayInsights}
          monthData={this.props.monthData}
          weekData={this.props.weekData}
          lineType={this.props.lineType}
          clockConfig={this.props.clockConfig}
          setDay={currentDay => this.props.setDay(currentDay)}
          heatmapChecked={this.props.heatmapChecked}
          allDatasetData={this.props.allDatasetData}
        />

        <div id="violinPlot"></div>

      </div>
    )
  }
}

export default WeekSummary;
