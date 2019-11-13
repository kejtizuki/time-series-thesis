import React, {createRef} from 'react';
import * as d3 from "d3";
import {scaleLinear, scaleBand, scaleTime, schemeCategory20c, scaleQuantize } from 'd3-scale';
import { select as d3Select } from 'd3-selection'
import moment from 'moment'

// import data from './../data/itching.csv';
// import *  as dataParser from './dataParser.js';
import './barChart.scss'


var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// set the ranges
var xBasic = scaleBand()
          .range([0, width])
          .padding(0.1);
var yBasic = scaleLinear()
          .range([height, 0]);


class BarChart extends React.Component {

 componentDidUpdate(prevProps) {
   if (prevProps !== this.props) {
     d3.select("svg").selectAll("*").remove();
     this.renderBarChart();
     // this.renderBarChartBasic();
   }
 }

 componentDidMount() {
    this.renderBarChart();
    // this.renderBarChartBasic();
  }

  //GRADIENT CHART
 renderBarChart() {

  const data = this.props.dataDayHours;
  const avgWeekday = this.props.avgWeekday;

  const x = scaleBand()
    .rangeRound([0, width])
    .domain(data.map((d) => d.key))
    .padding(0.1);

  const y = scaleLinear()
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

  var numColors = 10;
  var colorScale = d3.scaleLinear()
    .domain([0,(numColors-1)/2,numColors-1])
    .range(['#2A4858', "#74D877", "#F5D801"])
    .interpolate(d3.interpolateHcl);

  const bgGradient = defs.append("linearGradient")
    .attr("id", "bg-gradient")
    // .attr('gradientTransform', 'rotate(90)')
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "0%")
    .attr("y2", "100%")
    .attr("gradientUnits", "userSpaceOnUse")
    .selectAll("stop")
    .data(d3.range(numColors))
    .enter().append("stop")
    .attr("offset", function(d,i) { return (i/(numColors-1)*50 + 10) + "%"; })
    .attr("stop-color", function(d) { return colorScale(d); });

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
    .attr("transform", `translate(-3)`)

  graphArea
    .append('g')
    .attr('class', 'axis')
    .call(yAxis);

  svg.append("path")
    .datum(avgWeekday)
    .attr("fill", "none")
    .attr("stroke", "#2A41E5")
    .attr("stroke-width", 3)
    .attr("d", d3.line()
      .x(function(d) { return x(d.key) })
      .y(function(d) { return y(d.value) })
      .curve(d3.curveCatmullRom.alpha(0.5))
    )
    .attr("transform", "translate(" + 2*x.bandwidth() + ",0)")
 }

 //BASIC CHART
 renderBarChartBasic() {
    const data = this.props.dataDayHours;
    console.log('barchart data ', data)

    const svg = d3.select(this.refs.svgElemBar);

    var colors = ["#F5D801", "#74D877", '#2A4858'];

    var colorScaleBasic = scaleQuantize()
      .domain([0, colors.length - 1, d3.max(data, function(d) {
        return d.value;
      })])
      .range(colors);


    xBasic.domain(data.map(function(d) { return d.key; }));
    yBasic
    .domain([
      d3.min(data, function(d) { return d.value; }),
      d3.max(data, function(d) { return d.value })
    ])
    .nice();
    // .domain([0, d3.max(data, function(d) { return d.value; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return xBasic(d.key); })
        .attr("width", xBasic.bandwidth())
        .attr("y", function(d) { return yBasic(d.value); })
        .attr("height", function(d) { return height - yBasic(d.value); })
        .attr("fill", function(d) { return colorScaleBasic(d.value) });

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xBasic));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(yBasic));

 }


  render() {
    return(
      <div className="radialContainer center">

      <svg width={800} height={400}
          ref="svgElemBar">
      </svg>

      </div>
    )
  }
}

export default BarChart;
