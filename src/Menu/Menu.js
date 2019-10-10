import React, { Component } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import * as d3Axis from 'd3-axis'
import { select as d3Select } from 'd3-selection'

import './menu.scss'

class Menu extends Component {
  componentDidMount() {

  }

  componentDidUpdate() {

  }

  onDropdownChange(e) {
    this.props.setDate(e.value);
  }


  render() {

    const defaultOption = Object.keys(this.props.dayInsights)[0];

    return (
      <div className="menu">Chart options
        <Dropdown options={Object.keys(this.props.dayInsights)} onChange={(e) => this.onDropdownChange(e)} value={defaultOption} placeholder="Select an option" />
      </div>
    )
  }
}

export default Menu;
