import React from 'react'
import {
  BarChart,
  PieChart,
  PointChart,
  PolylineChart,
  RadarChart,
  RingChart
} from '../../src'
import './layout.less'

var cfg = {
  width: 300,
  height: 300,
  yKey: 'percent',
  xKey: 'name'
}

var data = [
  {
    name: 'JS',
    percent: '70%'
  },
  {
    name: 'HTML',
    percent: '60%'
  },
  {
    name: 'CSS',
    percent: '40%'
  },
  {
    name: 'React',
    percent: '62%'
  },
  {
    name: 'Vue',
    percent: '23%'
  },
  {
    name: 'Angular',
    percent: '42%'
  },
  {
    name: 'Flutter',
    percent: '10%'
  }
]

class App extends React.PureComponent {
  render () {
    return (
      <div style={{ margin: '50px 30px' }}>
        <div className="chart-wrap">
          <BarChart data={data} config={cfg} />
        </div>
        <div className="chart-wrap">
          <PieChart data={data} config={cfg} />
        </div>
        <div className="chart-wrap">
          <RingChart data={data} config={cfg} />
        </div>
        <div className="chart-wrap">
          <PointChart data={data} config={cfg} />
        </div>
        <div className="chart-wrap">
          <PolylineChart data={data} config={cfg} />
        </div>
        <div className="chart-wrap">
          <RadarChart data={data} config={cfg} />
        </div>
      </div>
    )
  }
}

export default App
