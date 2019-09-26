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

let _randomNum = function() {
    return Math.floor(Math.random() * 20);
  };


const getData = () => {
  return [{
    key: "Apples",
    values: [{
      key: "2004",
      value: _randomNum()
    }, {
      key: "2005",
      value: _randomNum()
    }, {
      key: "2006",
      value: _randomNum()
    }, {
      key: "2007",
      value: _randomNum()
    }, {
      key: "2008",
      value: _randomNum()
    }, {
      key: "2009",
      value: _randomNum()
    }, {
      key: "2010",
      value: _randomNum()
    }]
  },
  {
    key: "COs",
    values: [{
      key: "2004",
      value: _randomNum()
    }, {
      key: "2005",
      value: _randomNum()
    }, {
      key: "2006",
      value: _randomNum()
    }, {
      key: "2007",
      value: _randomNum()
    }, {
      key: "2008",
      value: _randomNum()
    }, {
      key: "2009",
      value: _randomNum()
    }, {
      key: "2010",
      value: _randomNum()
    }]
  },
  {
    key: "Oranges",
    values: [{
      key: "2004",
      value: _randomNum()
    }, {
      key: "2005",
      value: _randomNum()
    }, {
      key: "2006",
      value: _randomNum()
    }, {
      key: "2007",
      value: _randomNum()
    }, {
      key: "2008",
      value: _randomNum()
    }, {
      key: "2009",
      value: _randomNum()
    }, {
      key: "2010",
      value: _randomNum()
    }]
  }, {
    key: "Pears",
    values: [{
      key: "2004",
      value: _randomNum()
    }, {
      key: "2005",
      value: _randomNum()
    }, {
      key: "2006",
      value: _randomNum()
    }, {
      key: "2007",
      value: _randomNum()
    }, {
      key: "2008",
      value: _randomNum()
    }, {
      key: "2009",
      value: _randomNum()
    }, {
      key: "2010",
      value: _randomNum()
    }]
  }, {
    key: "Kiwis",
    values: [{
      key: "2004",
      value: _randomNum()
    }, {
      key: "2005",
      value: _randomNum()
    }, {
      key: "2006",
      value: _randomNum()
    }, {
      key: "2007",
      value: _randomNum()
    }, {
      key: "2008",
      value: _randomNum()
    }, {
      key: "2009",
      value: _randomNum()
    }, {
      key: "2010",
      value: _randomNum()
    }]
  }];
}

// const getData = () => {
//   return [
// {
// 	key: "data-1",
// 	values: [
// 						{key: "2004", value: 8},
// 						{key: "2005", value: 4},
// 						{key: "2006", value: 10},
// 						{key: "2007", value: 11},
// 						{key: "2008", value: 6},
// 						{key: "2009", value: 10},
// 						{key: "2010", value: 16}
// 					]
// },
// {
// 	key: "data-2",
// 	values: [
// 						{key: "2004", value: 2},
// 						{key: "2005", value: 4},
// 						{key: "2006", value: 10},
// 						{key: "2007", value: 7},
// 						{key: "2008", value: 20},
// 						{key: "2009", value: 6},
// 						{key: "2010", value: 18}
// 					]
// },
// {
// 	key: "data-3",
// 	values: [
// 						{key: "2004", value: 1},
// 						{key: "2005", value: 2},
// 						{key: "2006", value: 3},
// 						{key: "2007", value: 4},
// 						{key: "2008", value: 6},
// 						{key: "2009", value: 10},
// 						{key: "2010", value: 4}
// 					]
// },
// {
// 	key: "data-4",
// 	values: [
// 						{key: "2004", value: 1},
// 						{key: "2005", value: 2},
// 						{key: "2006", value: 3},
// 						{key: "2007", value: 4},
// 						{key: "2008", value: 6},
// 						{key: "2009", value: 10},
// 						{key: "2010", value: 4}
// 					]
// }
// ];
// }

const { rowKeys, columnKeys } = dataTransform(getData()).summary()

const margins = { top: 50, right: 15, bottom: 100, left: 60 }
const svgDimensions = { width: 800, height: 500 }

const maxRadius = 24;
const minRadius = 2;
const maxValue = d3.max(getData()[1].values, (d) => d.value)
let rowHeightConst = -7;

// if (this.state.data.length === 4) {
//   console.log("get d")
//   rowHeightConst = 2;
// }
// else if (this.state.dat.length === 4) {
//   rowHeightConst = -6;
// }

const rowHeight = (maxRadius * 2) + rowHeightConst;

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

  }

  render() {

    const data = this.state.data
    const svg = d3.select(this.refs.svg)

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
