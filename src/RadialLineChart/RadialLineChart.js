import React, {createRef} from 'react';
import * as d3 from "d3";
import {scaleLinear, scaleBand, scaleTime, scaleRadial, schemeCategory20c } from 'd3-scale';
import { select as d3Select } from 'd3-selection'
import moment from 'moment'

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

const y = scaleRadial()
    .range([innerRadius, outerRadius]);


class RadialLineChart extends React.Component {

 componentDidUpdate(prevProps) {
   if (prevProps !== this.props) {
     d3.select("svg").selectAll("*").remove();
     this.renderRadial();
   }
 }

 componentDidMount() {
   this.renderRadial()
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

    const data = this.props.dataDayHours;

    console.log('LINE ', this.props.clockConfig)

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

    console.log('data ', data)

    // Avg per month or per day (to compare) compare weekday with avg weekday
    // make options to see how could it be compared
    // minute by minute discuss in the report
    // See different averages and compare?
    // draw linecharts as a calendar -> to compare days in a month
    // weekly data -> ranges radial chart with lines
    // 26.11 14:00 meeting with Jakob

    console.log('this.props.avgWeekday', this.props.avgWeekday)
    // const mean = dataParser.getAvg(this.props.avgWeekday)

    x.domain(d3.extent(data, function(d) { return d.key; }));
    y.domain(d3.extent(data, function(d) { return d.value; }));

    // var linePlot = gSelect.append("path")
    var linePlot = d3.selectAll('.radial').append("path")
      .datum(data)
      .attr("fill", "url(#gradientRainbow)")
      .attr("stroke", "#213946")
      .attr("stroke-width", 1)
      .attr('z-index', 200)
      .attr("d", line);

    var avgWeekday = d3.selectAll('.radial').append("path")
      .datum(this.props.avgWeekday)
      .attr("fill", "none")
      .attr("stroke", "#2A41E5")
      .attr("stroke-width", 3)
      .attr("d", line);


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

    var yAxis = d3.selectAll('.radial').append("g")
    .attr("text-anchor", "middle");

    var yTick = yAxis
    .selectAll(".radial")
    // .selectAll("g")
    .data(y.ticks(5))
    .enter().append("g");

    yTick.append("circle")
      .attr("fill", "none")
      .attr("stroke", "#D8D8D8")
      .attr("opacity", 0.5)
      .attr("r", function(d) {return y(d)});

    //add avg
    // yAxis.append("circle")
    //   .attr("fill", "none")
    //   .attr("stroke", "#2A41E5")
    //   .attr("stroke-width", 3)
    //   .attr("r", function() { return y(this.props.avgWeekday) });

    yAxis.append("circle")
      .attr("fill", "white")
      .attr("stroke", "black")
      .attr("opacity", 1)
      .attr("r", function() { return y(y.domain()[0])});

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
          return ((angle < Math.PI / 2) || (angle > (Math.PI * 3 / 2))) ? "rotate(90)translate(0,22)" : "rotate(-90)translate(0, -15)"; })
            .text(function(d) {
            return d;
      })
      .style("font-size", 10)
      .attr("color", "#595D5C")
      .attr("opacity", 1)


      // var lineLength = linePlot.node().getTotalLength();
      //
      // linePlot
      //   .attr("stroke-dasharray", lineLength + " " + lineLength)
      //   .attr("stroke-dashoffset", -lineLength)
      //   .transition()
      //   .duration(1500)
      //   .ease(d3.easeLinear)
      //   .attr("stroke-dashoffset", 0);

  }

  render() {
    return(
      <div className="radialContainer center">

        <svg width={650} height={650}
            ref="svgElem">
        </svg>

      </div>
    )
  }
}

export default RadialLineChart;
