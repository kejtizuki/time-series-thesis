import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { interpolateLab } from 'd3-interpolate'

export default class Circles extends Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  // renderCircle = (d) => {
  //   return (
  //     <circle
  //      cx={this.props.xScale(d['key'])}
  //      cy={this.props.yScale(d['value'])}
  //      r={2}
  //      key={Math.random() * 1}
  //     />
  //   )
  // }

  render() {
    const { scales, margins, data, svgDimensions, rowHeight, index } = this.props
    const { xScale, yScale, rScale } = scales
    const { height } = svgDimensions

    console.log("data ", this.props.data)

    const circles = (

     data.values.map((val, j) =>
     <circle
       key={'key-' + val['key'] + val['key']}
       cx={xScale(val['key'])}
       cy={(height - margins.bottom - rowHeight*1.4) - (index*rowHeight*1.4)}
       r={rScale(val['value'])}
       fill='rgb(65, 44, 201, 0.7)'
     />
     )
   )

    return (
      <g>{circles}</g>
      // <g>{this.props.data.map(d => this.renderCircle(d))}</g>
    )
  }
}
