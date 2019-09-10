// import React from 'react';
// import './../Scatter/scatter.scss';
// import * as d3 from "d3";
// import {scaleLinear, scaleBand} from 'd3-scale';
// import Axes from './Axes'
// import { select as d3Select } from 'd3-selection'
// // import data from './../data/data'
// import data from './../data/itching.csv';
// import Circles from './Circles'
// import moment from 'moment'
//
// const extractDate = timeStamp => moment(`${timeStamp.split('T')[0]}`, 'YYYYMMDDxxx').format('YYYY-MM-DD').split('T')[0];
//
// const howManyInDay = arr => arr.reduce(function(obj, item) {
//   obj[item] = (obj[item] || 0) + 1;
//   return obj;
// }, {});
//
// const howManyInMonth = arr => arr.reduce(function(obj, item) {
//   obj[item.split('-')[1]] = (obj[item.split('-')[1]] || 0) + 1;
//   return obj;
// }, {});
//
// const getDayOfWeek = date => {
//   var dayOfWeek = new Date(date).getDay();
//   return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
// }
//
// const howManyWeekDayMonth = (arr, countedDays) => arr.reduce(function(obj, item) {
//   let date = new Date(item)
//   let weekdaysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
//   let weekdays = {}
//
//   weekdaysArr.map((day) => (
//     weekdays[day] = countedDays[item]
//   ))
//
//   obj[item.split('-')[1]] = Object.assign(
//     {},
//     weekdays
//   );
//
//   return obj
//
// }, {});
//
// const parseData = data => {
//   const cleaned = data.map(item => (item[data.columns[0]]).replace(/[-:.]/g, ''));
//   let newData = cleaned.map(item => ({ timestamp: extractDate(item) }));
//   //add at the beginning of array
//   newData.unshift({ timestamp: extractDate(data.columns[0]) });
//   const dataArr = newData.map(item => item.timestamp);
//   // console.log("new ", dataArr)
//   return dataArr
// };
//
// const margins = { top: 50, right: 15, bottom: 100, left: 60 }
// const svgDimensions = { width: 800, height: 500 }
//
//
// class ScatterMY extends React.Component {
//
//   constructor() {
//     super();
//     this.xScale = scaleBand()
//     this.yScale = scaleLinear()
//     this.state = {
//       data: data
//       // howManyInDay: howManyInDay
//     }
//   }
//
//   componentDidMount() {
//     d3.csv(data).then(data => {
//       // data = howManyInDay(parseData(data))
//       // console.log("how many in day ", howManyInDay(parseData(data)))
//       // console.log("how many in month ", howManyInMonth(parseData(data)))
//       console.log("how many weekday in month ", howManyWeekDayMonth(parseData(data), howManyInDay(parseData(data))))
//       //Change data to how mnay weekday in month change structure
//       this.setState({
//         data:  howManyInMonth(parseData(data)),
//         howManyInDay: howManyInDay(parseData(data))
//       })
//
//     }).catch(function(err) {
//         throw err;
//     })
//
//   }
//
//   getData = () => {
//     return howManyInMonth(parseData(data))
//   };
//
//
//   render() {
//
//     const data = this.state.data
//
//     const maxValue = d3.max(Object.values(data))
//     console.log('max ', maxValue)
//     console.log('keys', Object.keys(data).sort())
//
//     const xScale = this.xScale
//       .padding(0.5)
//       .domain(Object.keys(data).sort())
//       .range([margins.left, svgDimensions.width - margins.right])
//
//      // scaleLinear type
//     const yScale = this.yScale
//       .domain([0, maxValue])
//       .range([svgDimensions.height - margins.bottom, margins.top])
//
//
//     return(
//       // <p>ssaasa</p>
//       <div className="scatterContainer">
//         <svg width={svgDimensions.width} height={svgDimensions.height} ref="svg">
//           <Axes
//            scales={{ xScale, yScale }}
//            margins={margins}
//            svgDimensions={svgDimensions}
//            ticksX={13}
//            ticksY={7}
//          />
//
//         <Circles
//           scales={{ xScale, yScale }}
//           margins={margins}
//           data={data}
//           maxValue={maxValue}
//           svgDimensions={svgDimensions}
//         />
//       </svg>
//       </div>
//     )
//   }
// }
//
// export default ScatterMY;
