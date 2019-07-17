import React from 'react'
import {
  BarChart,
  PieChart,
  PointChart,
  PolylineChart,
  RadarChart,
  RingChart
} from '../../src'

var cfg = {
  width: 530,
  height: 400,
  yKey: 'percent',
  xKey: 'name'
}

var data = [
  {
    name: 'JS',
    percent: '80%'
  },
  {
    name: 'HTML',
    percent: '70%'
  },
  {
    name: 'CSS',
    percent: '50%'
  },
  {
    name: 'React',
    percent: '60%'
  }
]

class App extends React.PureComponent {
  render () {
    return (
      <div style={{ margin: '50px 30px' }}>
        <BarChart data={data} config={cfg} />
        <PieChart data={data} config={cfg} />
        <PointChart data={data} config={cfg} />
        <PolylineChart data={data} config={cfg} />
        <RadarChart data={data} config={cfg} />
        <RingChart data={data} config={cfg} />
      </div>
    )
  }
}

export default App
