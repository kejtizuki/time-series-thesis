import React, {createRef} from 'react';
import * as d3 from "d3";
import {scaleLinear, scaleBand, scaleTime, scaleRadial } from 'd3-scale';
import { select as d3Select } from 'd3-selection'
import moment from 'moment'

import data from './../data/itching.csv';
import *  as dataParser from './dataParser';
import './radialLineChart.scss'

const margin = {top: 20, right: 10, bottom: 20, left: 10};

const width = 960 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;

const svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const g = svg.append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

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
        // .curve(d3.curveCardinalClosed);


class RadialLineChart extends React.Component {

componentDidMount() {

  d3.csv(data).then(data => {

    // console.log('csv', data)
    // console.log("how many in day ", dataParser.howManyInDay(dataParser.parseData(data)))
    // console.log("how many in month ", dataParser.howManyInMonth(dataParser.parseData(data)))
    // console.log("how many weekday in month ", dataParser.howManyWeekDayMonth(dataParser.parseData(data), dataParser.howManyInDay(dataParser.parseData(data))))
    // console.log('day insights', dataParser.getDayInsights(data))
    console.log('day hours', dataParser.getDayHours(dataParser.getDayInsights(data), '2017-03-06'))
    console.log('day hours ARR', dataParser.getDayHoursArr(dataParser.getDayInsights(data), '2017-03-06'))

    // console.log('obj vals', Object.values(dataParser.getDayInsights(data)))

   data = dataParser.getDayHoursArr(dataParser.getDayInsights(data), '2017-03-27')

        x.domain(d3.extent(data, function(d) { return d.key; }));
  		  y.domain(d3.extent(data, function(d) { return d.value; }));

        var linePlot = g.append("path")
        	.datum(data)
          .attr("fill", "none")
          .attr("stroke", "#213946")
          .attr("d", line);

        var yAxis = g.append("g")
            .attr("text-anchor", "middle");

        var yTick = yAxis
          .selectAll("g")
          .data(y.ticks(5))
          .enter().append("g");

        yTick.append("circle")
            .attr("fill", "none")
            .attr("stroke", "black")
        		.attr("opacity", 0.2)
            .attr("r", y);

        yAxis.append("circle")
        		.attr("fill", "none")
            .attr("stroke", "black")
        		.attr("opacity", 0.2)
            .attr("r", function() { return y(y.domain()[0])});

        var labels = yTick.append("text")
            .attr("y", function(d) { return -y(d); })
            .attr("dy", "0.35em")
            .attr("fill", "none")
            .attr("stroke", "#fff")
            .attr("stroke-width", 5)
            .attr("stroke-linejoin", "round")
            .text(function(d) { return d; });

        yTick.append("text")
          .attr("y", function(d) { return -y(d); })
          .attr("dy", "0.35em")
          .text(function(d) { return d; });

        var xAxis = g.append("g");

        var xTick = xAxis
          .selectAll("g")
          .data(x.ticks(8))
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
          // return ((angle < Math.PI / 2) || (angle > (Math.PI * 3 / 2))) ? "rotate(90)translate(0,22)" : "rotate(-90)translate(0, -15)"; })
          return ((angle < Math.PI / 2) || (angle > (Math.PI * 3 / 2))) ? "rotate(90)translate(0,22)" : "rotate(-90)translate(0, -15)"; })
          .text(function(d) {
            console.log('d here', d)
            return d;
          })
        	.style("font-size", 10)
        	.attr("opacity", 0.6)

        var lineLength = linePlot.node().getTotalLength();

        linePlot
          .attr("stroke-dasharray", lineLength + " " + lineLength)
          .attr("stroke-dashoffset", -lineLength)
          .transition()
            .duration(2000)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);


  }).catch(function(err) {
      throw err;
  })

}

  render() {



    return(
      <div className="radialContainer center">

      </div>
    )
  }
}

export default RadialLineChart;
