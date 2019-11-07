import React, {createRef} from 'react';
import * as d3 from "d3";
import {scaleLinear, scaleBand, scaleTime, schemeCategory20c } from 'd3-scale';
import { select as d3Select } from 'd3-selection'
import moment from 'moment'

// import data from './../data/itching.csv';
// import *  as dataParser from './dataParser.js';
import './barChart.scss'


var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 800 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// set the ranges
var x = scaleBand()
          .range([0, width])
          .padding(0.1);
var y = scaleLinear()
          .range([height, 0]);


class BarChart extends React.Component {

 componentDidUpdate(prevProps) {
   if (prevProps !== this.props) {
     d3.select("svg").selectAll("*").remove();
     this.renderBarChart();
   }
 }

 renderBarChart() {
   const data = this.props.dataDayHours;
   console.log('barchart data ', data)

   const svg = d3.select(this.refs.svgElemBar);

  //  data.forEach(function(d) {
  //   d.sales = +d.sales;
  // });

  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.key; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.key); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

 }


  render() {
    return(
      <div className="radialContainer center">

      <svg width={800} height={300}
          ref="svgElemBar">
      </svg>

      </div>
    )
  }
}

export default BarChart;
