import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { interpolateLab } from 'd3-interpolate'

export default class Circles extends Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  render() {
    const { scales, margins, data, svgDimensions, rowHeight } = this.props
    const { xScale, yScale, rScale } = scales
    const { height } = svgDimensions

    console.log(this.props)

    const circles = (

     data.map((d, i) =>
     <circle
       key={i}
       cx={xScale(d['key']) - margins.left}
       cy={height - margins.bottom - rowHeight*8}
       r={rScale(d['value'])}
       fill='rgb(98, 77, 211, 0.7)'
     />
     )
   )

    return (
      <g>{circles}</g>
    )
  }
}
