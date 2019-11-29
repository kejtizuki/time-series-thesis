import React, {createRef} from 'react';
import * as d3 from "d3";
import {scaleLinear, scaleBand, scaleTime, scaleRadial, schemeCategory20c } from 'd3-scale';
import { select as d3Select } from 'd3-selection'
import moment from 'moment'

// import data from './../data/itching.csv';
import *  as dataParser from '../dataParser.js';
// import './radialLineChart.scss'


const margin = {top: 20, right: 10, bottom: 20, left: 10};

const circleDegree = 360;

const width = 150 - margin.left - margin.right,
  height = 150 - margin.top - margin.bottom;

const innerRadius = 20,
    outerRadius = Math.min(width, height) / 2 - 6;

const formatHour = d3.timeFormat("%I %p")

const fullCircle = 2 * Math.PI * 23/24;

const y = scaleRadial()
    .range([innerRadius, outerRadius]);


class CalendarRadial extends React.Component {

 // componentDidUpdate(prevProps) {
 //   console.log('prevProps:', prevProps)
 //   if (prevProps !== this.props) {
 //     console.log('clear:::');
 //     d3.select("svg").selectAll("*").remove();
 //     this.renderRadial();
 //   }
 // }

 componentDidMount() {
   this.renderRadial()
 }

 clockToRad(clock, direction) {
   var unit = circleDegree / 12;
   var degree = direction > 0 ? unit * clock : unit * clock - circleDegree;
   return this.degToRad(degree);
 }

 degToRad(degrees) {
   return degrees * Math.PI / 180;
 }


  renderRadial = () => {
    console.log('XXXXXXXXXX', this.props)

    const x = scaleLinear()

    if (this.props.clockConfig === 'Midnight Up') {
      x.range([0, fullCircle]);
    }
    else {
      x.range([0 + Math.PI, fullCircle + Math.PI]);
    }


    const line = d3.lineRadial()
  		.angle(function(d) { return x(d.key); })
  		.radius(function(d) { return y(d.value); })
      .curve(this.props.lineType)

    const data = this.props.dataDayHours;

    console.log('data radial calendar', data)

    const svg = d3.select(this.refs[this.props.currentDay])

    var g = svg.append("g")
    	.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    x.domain(d3.extent(data, function(d) { return d.key; }));
    // y.domain(d3.extent(data, function(d) { return d.value; }));
    // if (this.props.avgAllDataChecked) {
    //   y.domain(d3.extent(this.props.minMaxWeekdayData, function(d) { return d; }));
    // }
    // if (this.props.avgMonthDataChecked) {
    //   y.domain(d3.extent(this.props.minMaxAllData, function(d) { return d; }));
    // }
    // if (this.props.avgMonthDataChecked === false && this.props.avgAllDataChecked === false) {
    //   y.domain(d3.extent(data, function(d) { return d.value; }));
    // }

    y.domain(d3.extent(data, function(d) { return d.value; }));

    var yAxis = g.append("g")
    .attr("text-anchor", "middle");

    var yTick = yAxis
    .selectAll(".radial")
    // .selectAll("g")
    .data(y.ticks(6))
    .enter().append("g");

    yTick.append("circle")
      .attr("fill", "none")
      .attr("stroke", "#edf1f4")
      .attr("r", function(d) {return y(d)});


    var numColors = 10;
    var colorScale = d3.scaleLinear()
      .domain([0,(numColors-1)/2,numColors-1])
      .range(["#F5D801", "#74D877", "#2A4858"])
      .interpolate(d3.interpolateHcl);

    var gradient = g.append("defs").append("radialGradient")
      .attr("id", "gradientRainbow")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("cx", "0%")
      .attr("cy", "0%")
      .attr("r", "45%")
      .selectAll("stop")
      .data(d3.range(numColors))
      .enter().append("stop")
      .attr("offset", function(d,i) { return (i/(numColors-1)*50 + 40) + "%"; })
      .attr("stop-color", function(d) { return colorScale(d); });

    var linePlot = g.append("path")
      .datum(data)
      .attr("fill", "url(#gradientRainbow)")
      .attr("stroke", "#213946")
      .attr("stroke-width", 1)
      .attr("d", line);

    var yAxisWhite = g.append("g")
      .attr("text-anchor", "middle");

    yAxisWhite.append("circle")
      .attr("fill", "white")
      .attr("stroke", "black")
      .attr("opacity", 1)
      .attr("r", function() { return y(y.domain()[0])});


      //for from to pie chart
      const radius = 15;
      const fromClock = 15/2;
      const toClock = 9/2;

      var clockGroup, offSetX, offSetY, pi;
      pi = Math.PI;

      clockGroup = yAxisWhite.append("g")
        // .attr("transform", "translate(" + offSetX + "," + offSetY + ")");

      var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
        .startAngle(this.clockToRad(fromClock, -1))
        .endAngle(this.clockToRad(toClock, 1));

      //DAY
      clockGroup.append("circle")
        .attr("r", radius)
        .attr("fill", "#D0D6F9")
        .attr("class", "clock outercircle")

      //NIGHT
      clockGroup.append('path')
        .attr('d', arc)
        .style('fill', '#1A1571');


  }

  render() {
    return(
      <div className="center">

        <svg width={150} height={150}
            ref={this.props.currentDay} id={this.props.currentDay}>
        </svg>

      </div>
    )
  }
}

export default CalendarRadial;
