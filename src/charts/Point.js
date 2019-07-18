import React from 'react'
import PropTypes from 'prop-types'
import Base from './Base'
import { chartColors } from '../constants/color'
import { basePointSize } from '../constants/base'
import { getTotalCount } from '../utils/count'
import '../styles/point.less'

class Point extends React.PureComponent {
  static propTypes = {
    data: PropTypes.array,
    config: PropTypes.object
  }

  renderData = () => {
    const {
      data,
      config: {
        xKey,
        yKey,
        width,
        height
      }
    } = this.props

    const total = getTotalCount(data, yKey)
    const colors = [...chartColors]

    return data.map((item, idx) => {
      const percent = parseInt(item[yKey], 10) / total
      const x = Math.floor(Math.random() * width)
      const y = Math.floor(Math.random() * height)
      const color = item.color ? item.color : colors.pop()

      let scaleSize = percent * data.length
      if(scaleSize > 1) {
        scaleSize = 1
      }
      if(scaleSize < 0.5) {
        scaleSize = 0.5
      }

      const pointStyle = {
        backgroundColor: color,
        width: basePointSize,
        height: basePointSize,
        left: x,
        top: y,
        zIndex: idx,
        transform: `scale(${scaleSize})`
      }

      return (
        <div
          className="point"
          key={`point-${idx}`}
          style={pointStyle}
        >
          <div className="name">
            {item[xKey]}
            <div className="rate">
              {percent * 100 >> 0}%
            </div>
          </div>
        </div>
      )
    })
  }

  render () {
    const {
      config
    } = this.props

    return (
      <Base name='point' config={config}>
        <div className="point-canvas-wrap">
         {this.renderData()}
        </div>
      </Base>
    )
  }
}

export default Point
