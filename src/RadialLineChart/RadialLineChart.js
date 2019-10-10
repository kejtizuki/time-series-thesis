import React, {createRef} from 'react';
import * as d3 from "d3";
import {scaleLinear, scaleBand, scaleTime, scaleRadial, schemeCategory20c } from 'd3-scale';
import { select as d3Select } from 'd3-selection'
import moment from 'moment'

import data from './../data/itching.csv';
import *  as dataParser from './dataParser.js';
import './radialLineChart.scss'


const margin = {top: 20, right: 10, bottom: 20, left: 10};

const width = 600 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

const innerRadius = 100,
    outerRadius = Math.min(width, height) / 2 - 6;

const formatHour = d3.timeFormat("%I %p")

const fullCircle = 2 * Math.PI;

const x = scaleLinear()
    .range([0, fullCircle]);

const y = scaleRadial()
    .range([innerRadius, outerRadius]);

const line = d3.lineRadial()
    		.angle(function(d) { return x(d.key); })
    		.radius(function(d) { return y(d.value); })
        // .curve(d3.curveLinearClosed)
        .curve(d3.curveBasisClosed)

class RadialLineChart extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.currentDay !== this.props.currentDay;
  }

  componentWillReceiveProps() {
      d3.select(this.refs.svgElem).remove();

    const g = d3.select(this.refs.svgElem).append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const data = this.props.dataDayHours;

    const mean = dataParser.dayMean(data)

    x.domain(d3.extent(data, function(d) { return d.key; }));
    y.domain(d3.extent(data, function(d) { return d.value; }));

    var linePlot = g.append("path")
      .datum(data)
      .attr("fill", "url(#gradientRainbow)")
      .attr("stroke", "#213946")
      .attr("stroke-width", 2)
      .attr('z-index', 200)
      .attr("d", line);

    var numColors = 10;
    var colorScale = d3.scaleLinear()
      .domain([0,(numColors-1)/2,numColors-1])
      .range(["#F5D801", "#74D877", "#2A4858"])
      .interpolate(d3.interpolateHcl);

    d3.select(this.refs.svgElem).append("defs").append("radialGradient")
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

    var yAxis = g.append("g")
    .attr("text-anchor", "middle");

    var yTick = yAxis
    .selectAll("g")
    .data(y.ticks(5))
    .enter().append("g");

    yTick.append("circle")
      .attr("fill", "none")
      .attr("stroke", "#D8D8D8")
      .attr("opacity", 0.5)
      .attr("r", function(d) {return y(d)});

    //add avg
    yAxis.append("circle")
      .attr("fill", "none")
      .attr("stroke", "#2A41E5")
      .attr("stroke-width", 3)
      .attr("r", function() { return y(mean) });

    yAxis.append("circle")
      .attr("fill", "white")
      .attr("stroke", "black")
      .attr("opacity", 1)
      //     .attr("r", function() { return 400 });
      .attr("r", function() { return y(y.domain()[0])});

        // yTick.append("rect")
        //   .attr("y", function(d) { return -y(d); })
        //   .attr("x", -40)
        //   .attr('width', 80)
        //   .attr('height', 90)
        //   .attr('fill', 'white');

      yTick.append("text")
        .attr("y", function(d) { return -y(d); })
        .attr("dy", "0.35em")
        .text(function(d, i) {
          if (d === 0) {
          return ""
        }
        else {
          return d
        }
      });


      var xAxis = g.append("g");

      var xTick = xAxis
        .selectAll("g")
        .data(x.ticks(12))
        .enter().append("g")
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
        return "rotate(" + ((x(d)) * 180 / Math.PI - 90) + ")translate(" + innerRadius + ",0)";
        });

      xTick.append("line")
        .attr("x2", -5)
        .attr("stroke", "#000");

      xTick.append("text")
        .attr("transform", function(d) {
          var angle = x(d.key);
          return ((angle < Math.PI / 2) || (angle > (Math.PI * 3 / 2))) ? "rotate(90)translate(0,22)" : "rotate(-90)translate(0, -15)"; })
            .text(function(d) {
            return d;
      })
        .style("font-size", 10)
        .attr("opacity", 0.6)

      var lineLength = linePlot.node().getTotalLength();

      linePlot
        .attr("stroke-dasharray", lineLength + " " + lineLength)
        .attr("stroke-dashoffset", -lineLength)
        .transition()
        .duration(1500)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);
}

  render() {
    return(
      <div className="radialContainer center">

        <svg width={600} height={600}
            ref="svgElem">
        </svg>
        {/* <select>
          {this.state.dayHours.map(day =>
            <option key={day} value={day}>{day}</option>
          )};
        </select> */}

      </div>
    )
  }
}

export default RadialLineChart;
