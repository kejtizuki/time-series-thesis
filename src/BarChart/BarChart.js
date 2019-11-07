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
// var x = scaleBand()
//           .range([0, width])
//           .padding(0.1);
// var y = scaleLinear()
//           .range([height, 0]);


class BarChart extends React.Component {

 componentDidUpdate(prevProps) {
   if (prevProps !== this.props) {
     d3.select("svg").selectAll("*").remove();
     this.renderBarChart();
   }
 }

 renderBarChart() {

  const data = this.props.dataDayHours;
  const x = d3.scaleBand()
    .rangeRound([0, width])
    .domain(data.map((d) => d.key))
    .padding(0.1);

  const y = d3.scaleLinear()
    .range([height, 0])
    .domain([
      d3.min(data, function(d) { return d.value; }),
      d3.max(data, function(d) { return d.value })
    ])
    .nice();

  const svg = d3.select(this.refs.svgElemBar);

  const graphArea = svg
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const defs = svg.append('defs');

  const bgGradient = defs
    .append('linearGradient')
    .attr('id', 'bg-gradient')
    .attr('gradientTransform', 'rotate(90)');

    // "#F5D801", "#74D877", "#2A4858"

  bgGradient
    .append('stop')
    .attr('stop-color', '#2A4858')
    .attr('offset', '0%');
  bgGradient
    .append('stop')
    .attr('stop-color', '#74D877')
    .attr('offset', '50%');
  bgGradient
    .append('stop')
    .attr('stop-color', '#F5D801')
    .attr('offset', '100%');

  defs
    .append('clipPath')
    .attr('id', 'clip-bar-rects')
    .selectAll('bar')
    .data(data)
    .enter()
    .append('rect')
    .attr("x", d => x(d.key))
    .attr("y", d => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.value));

  const clipPath = graphArea
    .append('g')
    .attr('clip-path', `url(#clip-bar-rects)`);

  clipPath
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', width)
    .attr('height', height)
    .style('fill', 'url(#bg-gradient)');

  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y).ticks(5);

  const ax = graphArea
    .append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis);

  ax.selectAll('text')
    .style("text-anchor", "start")
    .style("alignment-baseline", "middle")
    .attr("transform", `translate(${x.bandwidth() / 2}, 10) rotate(90)`)

  graphArea
    .append('g')
    .attr('class', 'axis')
    .call(yAxis);

 }

 renderBarChartBasic() {
  //  const data = this.props.dataDayHours;
  //  console.log('barchart data ', data)
  //
  //  const svg = d3.select(this.refs.svgElemBar);
  //
  // x.domain(data.map(function(d) { return d.key; }));
  // y.domain([0, d3.max(data, function(d) { return d.value; })]);
  //
  // // append the rectangles for the bar chart
  // svg.selectAll(".bar")
  //     .data(data)
  //   .enter().append("rect")
  //     .attr("class", "bar")
  //     .attr("x", function(d) { return x(d.key); })
  //     .attr("width", x.bandwidth())
  //     .attr("y", function(d) { return y(d.value); })
  //     .attr("height", function(d) { return height - y(d.value); })
  //     .attr("fill", 'red');
  //
  // // add the x Axis
  // svg.append("g")
  //     .attr("transform", "translate(0," + height + ")")
  //     .call(d3.axisBottom(x));
  //
  // // add the y Axis
  // svg.append("g")
  //     .call(d3.axisLeft(y));

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
