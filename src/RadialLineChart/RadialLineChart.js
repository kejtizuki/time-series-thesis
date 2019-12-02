import React, {createRef} from 'react';
import * as d3 from "d3";
import {scaleLinear, scaleBand, scaleTime, scaleRadial, schemeCategory20c } from 'd3-scale';
import { select as d3Select } from 'd3-selection'
import { getSunrise, getSunset } from 'sunrise-sunset-js';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import advancedFormat from 'dayjs/plugin/advancedFormat'

// import data from './../data/itching.csv';
import *  as dataParser from '../dataParser.js';
import './radialLineChart.scss'


const margin = {top: 20, right: 10, bottom: 20, left: 10};

const width = 650 - margin.left - margin.right,
  height = 650 - margin.top - margin.bottom;

const innerRadius = 100,
    outerRadius = Math.min(width, height) / 2 - 6;

const formatHour = d3.timeFormat("%I %p")

const fullCircle = 2 * Math.PI * 23/24;
const circleDegree = 360;

const y = scaleRadial()
    .range([innerRadius, outerRadius]);


class RadialLineChart extends React.Component {

 componentDidUpdate(prevProps) {

   console.log('did updateeee prevProps', prevProps)
   console.log('did updateeee props', this.props)
   if (prevProps !== this.props) {
     d3.select("svg").selectAll("*").remove();
     this.renderRadial();
   }
 }

 componentDidMount() {

   this.renderRadial()
 }

 degToRad(degrees) {
   return degrees * Math.PI / 180;
 }

 clockToRad(clock, direction) {
   var unit = circleDegree / 12;
   var degree = direction > 0 ? unit * clock : unit * clock - circleDegree;
   return this.degToRad(degree);
 }

 getCoordFromCircle(deg, cx, cy, r) {
   var rad = this.degToRad(deg);
   var x = cx + r * Math.cos(rad);
   var y = cy + r * Math.sin(rad);
   return [x, y];
 }

 splitDegrees(num) {
   var angle = circleDegree / num;
   var degrees = [];

   for (var ang = 0; ang < circleDegree; ang += angle) {
     degrees.push(ang);
   }

   return degrees;
 }

  renderRadial = () => {

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

    const currentDay = this.props.currentDay
    console.log('currentDay', currentDay)
    const data = this.props.dataDayHours;

    // dayjs.extend(LocalizedFormat)
    dayjs.extend(advancedFormat)

    let sunset, sunrise;
    if (currentDay !== undefined) {
     sunset = dayjs(getSunset(55.67594, 12.56553, new Date(currentDay))).format('k');
     sunrise = dayjs(getSunrise(55.67594, 12.56553, new Date(currentDay))).format('k')
     sunset = parseInt(sunset)/2
     sunrise = parseInt(sunrise)/2
    }

    const svg = d3.select(this.refs.svgElem);
    const gSelect = svg.selectAll('.radial').data(data);

    gSelect.exit()
    .classed('radial', false)
    .attr('opacity', 0.8)
    .transition()
    .attr('opacity', 0)
    .remove();

    // current.interrupt();

    var gEnter = gSelect.enter().append("g")
    // const g = svg
    // .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    .classed('radial', true);

    const exit = gSelect.exit().classed('radial', false);
    exit
    .attr('opacity', 0.8)
    .transition()
    .attr('opacity', 0)
    .remove();

    x.domain(d3.extent(data, function(d) { return d.key; }));
    if (this.props.avgAllDataChecked) {
      y.domain(d3.extent(this.props.minMaxWeekdayData, function(d) { return d; }));
    }
    if (this.props.avgMonthDataChecked) {
      y.domain(d3.extent(this.props.minMaxAllData, function(d) { return d; }));
    }
    if (this.props.avgMonthDataChecked === false && this.props.avgAllDataChecked === false) {
      y.domain(d3.extent(data, function(d) { return d.value; }));
    }

    var yAxis = d3.selectAll('.radial').append("g")
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

    var gradient = d3.selectAll('.radial').append("defs").append("radialGradient")
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

    var linePlot = d3.selectAll('.radial').append("path")
      .datum(data)
      .attr("fill", "url(#gradientRainbow)")
      .attr("stroke", "#213946")
      .attr("stroke-width", 1)
      .attr("d", line);

    var avgWeekday;
    if (this.props.avgAllDataChecked) {
      avgWeekday = d3.selectAll('.radial').append("path")
        .datum(this.props.avgWeekday)
        .attr("fill", "none")
        .attr("stroke", "#2A41E5")
        .attr("stroke-width", 1)
        .attr("d", line);
    }

    var avgWeekdayInAMonth;
    if (this.props.avgMonthDataChecked) {
      avgWeekdayInAMonth = d3.selectAll('.radial').append("path")
        .datum(this.props.avgWeekdayInAMonth)
        .attr("fill", "none")
        .attr("stroke", "#F05336")
        .attr("stroke-width", 1)
        // .attr("stroke-width", function(d) { console.log(d.value );return y(d.value); })
        .attr("d", line);
    }


    var yAxisWhite = d3.selectAll('.radial').append("g")
      .attr("text-anchor", "middle");

    yAxisWhite.append("circle")
      .attr("fill", "white")
      .attr("stroke", "black")
      .attr("opacity", 1)
      .attr("r", function() { return y(y.domain()[0])});

    // yAxis.append("circle")
    //   .attr("fill", "none")
    //   .attr("stroke", "#2A41E5")
    //   .attr("stroke-width", 3)
    //   .attr("r", function() { return y(this.props.avgWeekday) });

      var xAxis = svg.selectAll('.radial').append("g");

      var xTick = xAxis
        // .selectAll("g")
        .selectAll(".radial")
        .data(x.ticks(24))
        .enter().append("g")
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "rotate(" + ((x(d)) * 180 / Math.PI - 90) + ")translate(" + innerRadius + ",0)";
        });

      xTick.append("line")
        .attr("x2", -5)
        .attr("stroke", "#595D5C");

      xTick.append("text")
      .attr("transform", function(d) {
        var angle = x(d.key);
        return ((angle < Math.PI / 2) || (angle > (Math.PI * 3 / 2))) ? "rotate(90)translate(0,0)" : "rotate(-90)translate(0, -15)"; })
          .text(function(d) {
          return d;
      })
      .style("font-size", 10)
      .attr("color", "#595D5C")
      .attr("opacity", 1)

      var yAxisText = d3.selectAll('.radial').append("g")
      .attr("text-anchor", "middle");

      var yTickText = yAxisText
      .selectAll(".radial")
      // .selectAll("g")
      .data(y.ticks(6))
      .enter().append("g");

      yTickText.append("text")
        .attr("y", function(d) { return -y(d); })
        .attr("dy", "0.35em")
        .style('fill', '#565656')
        .text(function(d, i) {
          if (d === 0) {
          return ""
        }
        else {
          return d
        }
      });

    //for from to pie chart
    const radius = 70;
    const fromClock = 15/2;
    const toClock = 9/2;

    var clockGroup, offSetX, offSetY, pi;
    pi = Math.PI;

    clockGroup = yAxisWhite.append("g")
      .attr("transform", "translate(" + offSetX + "," + offSetY + ")");

    var arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
      .startAngle(this.clockToRad(sunset, -1))
      .endAngle(this.clockToRad(sunrise, 1));

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
      <div className="radialContainer center">

        <svg width={650} height={650}
            ref="svgElem" id="radial">
        </svg>

      </div>
    )
  }
}

export default RadialLineChart;
