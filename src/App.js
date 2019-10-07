import React from 'react';
// import logo from './logo.svg';
import Scatter from './Scatter/Scatter'
import ScatterMY from './ScatterMY/ScatterMY'
import RadialLineChart from './RadialLineChart/RadialLineChart'
import RadialLineChartLib from './RadialLineChart/RadialLineChartLib'
import Menu from './Menu/Menu'
import './App.scss';

function App() {
  return (
    <div className="app">
      {/* <Scatter /> */}
      <div className="menuContainer">
        <Menu />
      </div>
      <div className="chartContainer">
        <h3></h3>
        <RadialLineChart />
      </div>
      {/* <RadialLineChartLib /> */}
      {/* <ScatterMY /> */}
    </div>
  );
}

export default App;
