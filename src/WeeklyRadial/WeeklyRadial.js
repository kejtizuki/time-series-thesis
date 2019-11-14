import React, {createRef} from 'react';
import * as d3 from "d3";
import {scaleLinear, scaleBand, scaleTime, scaleRadial, schemeCategory20c } from 'd3-scale';
import { select as d3Select } from 'd3-selection'
import moment from 'moment'

// import data from './../data/itching.csv';
import *  as dataParser from '../dataParser.js';
import './weeklyRadial.scss'


const margin = {top: 20, right: 10, bottom: 20, left: 10};

const width = 650 - margin.left - margin.right,
  height = 650 - margin.top - margin.bottom;

const innerRadius = 100,
    outerRadius = Math.min(width, height) / 2 - 6;

const formatHour = d3.timeFormat("%I %p")

const fullCircle = 2 * Math.PI * 23/24;

const y = scaleRadial()
    .range([innerRadius, outerRadius]);


class WeeklyRadial extends React.Component {

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

    // Avg per month or per day (to compare) compare weekday with avg weekday
    // make options to see how could it be compared
    // minute by minute discuss in the report
    // See different averages and compare?
    // draw linecharts as a calendar -> to compare days in a month
    // weekly data -> ranges radial chart with lines
    // 26.11 14:00 meeting with Jakob

    // const mean = dataParser.getAvg(this.props.avgWeekday)

    x.domain(d3.extent(data, function(d) { return d.key; }));
    y.domain(d3.extent(data, function(d) { return d.value; }));

    // var linePlot = gSelect.append("path")

    var avgMonday = d3.selectAll('.radial').append("path")
      .datum(this.props.avgMonday)
      .attr("fill", "none")
      .attr("stroke", "#2A41E5")
      .attr("stroke-width", 1)
      .attr("d", line);

    var avgTuesday = d3.selectAll('.radial').append("path")
      .datum(this.props.avgTuesday)
      .attr("fill", "none")
      .attr("stroke", "#24bbc0")
      .attr("stroke-width", 1)
      .attr("d", line);

    var avgWednesday = d3.selectAll('.radial').append("path")
      .datum(this.props.avgWednesday)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 1)
      .attr("d", line);

    var avgThursday = d3.selectAll('.radial').append("path")
      .datum(this.props.avgThursday)
      .attr("fill", "none")
      .attr("stroke", "#F1C459")
      .attr("stroke-width", 1)
      .attr("d", line);


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

export default WeeklyRadial;
