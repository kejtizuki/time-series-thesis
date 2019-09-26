import React, {createRef} from 'react';
import * as d3 from "d3";
import {scaleLinear, scaleBand} from 'd3-scale';
import { select as d3Select } from 'd3-selection'
import moment from 'moment'

import data from './../data/itching.csv';
import *  as dataParser from './dataParser';
import { RadialAreaChart } from "reaviz";
import { RadialAreaSeries, RadialArea, sequentialScheme, RadialAxis,
  RadialAxisTickSeries,
  RadialAxisTick,
  RadialAxisTickLabel,
  RadialAxisArcSeries,
  RadialAxisTickLine, RadialAxisArc } from 'reaviz';



const dataX =[
{
  data: 46,
  id: '50',
  key: new Date('2019-08-07T22:00:00.000Z')
},
{
  data: 20,
  id: '49',
  key: new Date('2019-08-08T22:00:00.000Z')
},
{
  data: 32,
  id: '48',
  key: new Date('2019-08-09T22:00:00.000Z')
},
{
  data: 27,
  id: '47',
  key: new Date('2019-08-10T22:00:00.000Z')
},
{
  data: 8,
  id: '46',
  key: new Date('2019-08-11T22:00:00.000Z')
},
{
  data: 3,
  id: '45',
  key: new Date('2019-08-12T22:00:00.000Z')
},
{
  data: 18,
  id: '44',
  key: new Date('2019-08-13T22:00:00.000Z')
},
{
  data: 4,
  id: '43',
  key: new Date('2019-08-14T22:00:00.000Z')
},
{
  data: 19,
  id: '42',
  key: new Date('2019-08-15T22:00:00.000Z')
},
{
  data: 40,
  id: '41',
  key: new Date('2019-08-16T22:00:00.000Z')
},
{
  data: 36,
  id: '40',
  key: new Date('2019-08-17T22:00:00.000Z')
},
{
  data: 26,
  id: '39',
  key: new Date('2019-08-18T22:00:00.000Z')
},
{
  data: 26,
  id: '38',
  key: new Date('2019-08-19T22:00:00.000Z')
},
{
  data: 48,
  id: '37',
  key: new Date('2019-08-20T22:00:00.000Z')
},
{
  data: 49,
  id: '36',
  key: new Date('2019-08-21T22:00:00.000Z')
},
{
  data: 36,
  id: '35',
  key: new Date('2019-08-22T22:00:00.000Z')
},
{
  data: 35,
  id: '34',
  key: new Date('2019-08-23T22:00:00.000Z')
},
{
  data: 40,
  id: '33',
  key: new Date('2019-08-24T22:00:00.000Z')
},
{
  data: 7,
  id: '32',
  key: new Date('2019-08-25T22:00:00.000Z')
},
{
  data: 47,
  id: '31',
  key: new Date('2019-08-26T22:00:00.000Z')
},
{
  data: 12,
  id: '30',
  key: new Date('2019-08-27T22:00:00.000Z')
},
{
  data: 37,
  id: '29',
  key: new Date('2019-08-28T22:00:00.000Z')
},
{
  data: 17,
  id: '28',
  key: new Date('2019-08-29T22:00:00.000Z')
},
{
  data: 40,
  id: '27',
  key: new Date('2019-08-30T22:00:00.000Z')
},
{
  data: 34,
  id: '26',
  key: new Date('2019-08-31T22:00:00.000Z')
},
{
  data: 48,
  id: '25',
  key: new Date('2019-09-01T22:00:00.000Z')
},
{
  data: 40,
  id: '24',
  key: new Date('2019-09-02T22:00:00.000Z')
},
{
  data: 4,
  id: '23',
  key: new Date('2019-09-03T22:00:00.000Z')
},
{
  data: 34,
  id: '22',
  key: new Date('2019-09-04T22:00:00.000Z')
},
{
  data: 42,
  id: '21',
  key: new Date('2019-09-05T22:00:00.000Z')
},
{
  data: 31,
  id: '20',
  key: new Date('2019-09-06T22:00:00.000Z')
},
{
  data: 2,
  id: '19',
  key: new Date('2019-09-07T22:00:00.000Z')
},
{
  data: 2,
  id: '18',
  key: new Date('2019-09-08T22:00:00.000Z')
},
{
  data: 46,
  id: '17',
  key: new Date('2019-09-09T22:00:00.000Z')
},
{
  data: 42,
  id: '16',
  key: new Date('2019-09-10T22:00:00.000Z')
},
{
  data: 41,
  id: '15',
  key: new Date('2019-09-11T22:00:00.000Z')
},
{
  data: 31,
  id: '14',
  key: new Date('2019-09-12T22:00:00.000Z')
},
{
  data: 21,
  id: '13',
  key: new Date('2019-09-13T22:00:00.000Z')
},
{
  data: 30,
  id: '12',
  key: new Date('2019-09-14T22:00:00.000Z')
},
{
  data: 6,
  id: '11',
  key: new Date('2019-09-15T22:00:00.000Z')
},
{
  data: 18,
  id: '10',
  key: new Date('2019-09-16T22:00:00.000Z')
},
{
  data: 41,
  id: '9',
  key: new Date('2019-09-17T22:00:00.000Z')
},
{
  data: 19,
  id: '8',
  key: new Date('2019-09-18T22:00:00.000Z')
},
{
  data: 17,
  id: '7',
  key: new Date('2019-09-19T22:00:00.000Z')
},
{
  data: 39,
  id: '6',
  key: new Date('2019-09-20T22:00:00.000Z')
},
{
  data: 9,
  id: '5',
  key: new Date('2019-09-21T22:00:00.000Z')
},
{
  data: 4,
  id: '4',
  key: new Date('2019-09-22T22:00:00.000Z')
},
{
  data: 40,
  id: '3',
  key: new Date('2019-09-23T22:00:00.000Z')
},
{
  data: 17,
  id: '2',
  key: new Date('2019-09-24T22:00:00.000Z')
},
{
  data: 22,
  id: '1',
  key: new Date('2019-09-25T22:00:00.000Z')
}
]

class RadialLineChartLib extends React.Component {

  render() {

    return(
      <div className="radialContainer">
        <RadialAreaChart
        height={700}
        width={700}
        data={dataX}
        innerRadius={40}
        series={
          <RadialAreaSeries
            area={null}
            colorScheme={sequentialScheme}
            animated={1}
            interpolation={1}
          />
        }
        axis={<RadialAxis arcs={<RadialAxisArcSeries
          arc={<RadialAxisArc stroke="#71808d" strokeDasharray="1,4"/>}
          count={10}/>}
          innerRadius={10}
          ticks={<RadialAxisTickSeries count={5} tick={<RadialAxisTick label={<RadialAxisTickLabel autoRotate fill="#71808d" fontFamily="sans-serif" fontSize={11} padding={15}/>} line={<RadialAxisTickLine position="outside" size={10} stroke="rgba(113, 128, 141, .5)"/>} outerRadius={0} padding={0}/>}/>}/>}
      />
      </div>
    )
  }
}

export default RadialLineChartLib;
