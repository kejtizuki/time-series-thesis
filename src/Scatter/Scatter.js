import React, {createRef} from 'react';
import './../Scatter/scatter.scss';
import * as d3 from "d3";
import {scaleLinear, scaleBand} from 'd3-scale';
import Axes from './Axes'
import { select as d3Select } from 'd3-selection'
// import data from './../data/data'
// import data from './../data/itching.csv';
import Circles from './Circles'
import moment from 'moment'
import dataTransform from "./dataTransform";

const getData = () => {
  return [
{
	key: "data-1",
	values: [
						{key: "2004", value: 8},
						{key: "2005", value: 4},
						{key: "2006", value: 10},
						{key: "2007", value: 11},
						{key: "2008", value: 6},
						{key: "2009", value: 10},
						{key: "2010", value: 16}
					]
},
{
	key: "data-2",
	values: [
						{key: "2004", value: 2},
						{key: "2005", value: 4},
						{key: "2006", value: 10},
						{key: "2007", value: 7},
						{key: "2008", value: 20},
						{key: "2009", value: 6},
						{key: "2010", value: 18}
					]
},
{
	key: "data-3",
	values: [
						{key: "2004", value: 1},
						{key: "2005", value: 2},
						{key: "2006", value: 3},
						{key: "2007", value: 4},
						{key: "2008", value: 6},
						{key: "2009", value: 10},
						{key: "2010", value: 4}
					]
},
{
	key: "data-4",
	values: [
						{key: "2004", value: 1},
						{key: "2005", value: 2},
						{key: "2006", value: 3},
						{key: "2007", value: 4},
						{key: "2008", value: 6},
						{key: "2009", value: 10},
						{key: "2010", value: 4}
					]
}
];
}

const { rowKeys, columnKeys } = dataTransform(getData()).summary()

const margins = { top: 50, right: 15, bottom: 100, left: 60 }
const svgDimensions = { width: 800, height: 500 }

const maxRadius = 24;
const minRadius = 2;
const maxValue = d3.max(getData()[1].values, (d) => d.value)

const rowHeight = (maxRadius * 2) + 2;

const xScale = scaleBand()
  .domain(columnKeys)
  .range([margins.left, svgDimensions.width - margins.right])
  .padding(1);

const yScale = scaleBand()
  .domain(rowKeys)
  .range([svgDimensions.height - margins.bottom, margins.top])
  .padding(1);

const rScale = scaleLinear()
  .domain([0, maxValue])
  .range([minRadius, maxRadius]);

class Scatter extends React.Component {

  constructor() {
    super();
    this.xScale = scaleBand()
    this.yScale = scaleBand()
    this.rScale = scaleLinear()
    this.state = {
      data: getData()
    }
  }

  componentDidMount() {
    console.log(getData())
    // this.generateCircles(this.state.data)
  }

  componentWillUpdate() {
    // this.generateCircles(this.state.data)
  }

  generateCircles(data) {
    console.log('d length ', data.length)
    for (var j = 0; j < data.length; j++) {
      console.log()

      //
      // let circles = d3.selectAll('g').selectAll("circle")

      // let circles = d3.select(this.chartArea).selectAll('circle').data(data[j]['values']);
      //
      // circles.enter().append('circle')
      //     .attr("r", function(d) { return rScale(d['value']) })
      //     .attr('fill', 'rgb(98, 77, 211, 0.7)')
      //     .transition().duration(500)
      //     .attr('cx', (d) => xScale(d['key']))
      //     // .attr('cy', (d, i) => (svgDimensions.height - margins.bottom - rowHeight*(j+1) - margins.top))
      //     .attr('cy', ((svgDimensions.height - margins.bottom - rowHeight*1.4) - (j*rowHeight)))

      // console.log(data)
      // if(d3.select(this.svg.current).select('.brain-canvas').empty()) {
      //   console.log('doesnt')
      // }
      // else {
      //   console.log('yesss')
      //   this.svg.current.append('g')
      //   .selectAll("dot")
      //   .data(data[j]['values'])
      //   .enter()
      //   .append("circle")
      //   .attr("cx", function(d, i) { return (xScale(d['key']) - margins.left)})
      //   .attr("cy", (svgDimensions.height - margins.bottom - rowHeight*8))
      //   .attr("r", function(d) { return rScale(d['value']) })
      //   .style("fill", 'rgb(98, 77, 211, 0.7)');
      // }
      //

      let g = this.svg.append("g");

      let circles = d3.selectAll('g').selectAll("circle")
        .data(data[j]['values'])
        .enter()
        .append("circle");

      let rDomain = [0, d3.max(data[j]['values'], function(d) { return d['value']; })];
      let rScale = this.rScale
        .domain(rDomain)
        .range([minRadius, maxRadius]);

      circles
        .attr("cx", function(d, i) { return (xScale(d['key']) - margins.left)})
        .attr("cy", (svgDimensions.height - margins.bottom - rowHeight*8))
        .attr("r", function(d) { return rScale(d['value']) })
        .style("fill", 'rgb(98, 77, 211, 0.7)');
      }
    }

  render() {

    const data = this.state.data
    const svg = d3.select(this.refs.svg);

    console.log('max ', maxValue)
    console.log('keys', Object.keys(data).sort())

    console.log("column keys", columnKeys)
    console.log("row keys", rowKeys)

    // this.yAxis = d3.axisLeft()
    // 			.scale(this.yScale);
    //
		// this.xAxis = d3.axisBottom()
		// 	.tickFormat(function(d) { return d; })
		// 	.scale(this.xScale);

    return(
      <div className="scatterContainer">
        <svg width={svgDimensions.width} height={svgDimensions.height} ref={(node) => { this.svg = node; }}>
          <Axes
           scales={{ xScale, yScale }}
           margins={margins}
           svgDimensions={svgDimensions}
           ticksX={7}
           ticksY={4}
         />
         <g ref={(node) => { this.chartArea = node; }} />
        {/* <g className="circles"></g> */}
        {data.map((d, i) => <Circles
          scales={{ xScale, yScale, rScale }}
          margins={margins}
          data={d}
          index={i}
          rowKeys={rowKeys}
          columnKeys={columnKeys}
          maxValue={maxValue}
          rowHeight={rowHeight}
          svg={this.svg}
          svgDimensions={svgDimensions}
        />)}
      </svg>
      </div>
    )
  }
}

export default Scatter;
