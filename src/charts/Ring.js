import React from 'react'
import PropTypes from 'prop-types'
import Base from './Base'
import { bgColor, chartColors, maskColor } from '../constants/color'
import '../styles/ring.less'

class Ring extends React.PureComponent {
  static propTypes = {
    data: PropTypes.array,
    config: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.bgCanvasRef = React.createRef()
    this.dataCanvasRef = React.createRef()
  }

  state = {
    tip: ''
  }

  componentDidMount() {
    this.drawBg()
    this.drawData()
  }

  drawBg = () => {
      const {
        config: {
          width
        }
      } = this.props
      
      const r = width/2
      const ctx = this.bgCanvasRef.current.getContext('2d')
      ctx.beginPath()
      ctx.arc(r, r, r, 0, 2 * Math.PI)
      ctx.fillStyle = bgColor
      ctx.fill()
  }

  drawData = () => {
    const {
      data,
      config: {
        yKey,
        width
      }
    } = this.props

    let startAngle = 1.5 * Math.PI
    const ctx = this.dataCanvasRef.current.getContext('2d')
    const r = width / 2

    const item = data[0]
    const percent = parseInt(item[yKey], 10) / 100
    const endAngle = startAngle + 2 * Math.PI * percent

    ctx.beginPath()
    ctx.moveTo(r, r)
    ctx.arc(r, r, r, startAngle, endAngle)
    ctx.fillStyle = item.color ? item.color : chartColors[0]
    ctx.fill()

    ctx.beginPath()
    ctx.arc(r, r, r * 0.8, 0, 2 * Math.PI)
    ctx.fillStyle = maskColor
    ctx.fill()

    this.addTip({
      item,
      percent
    })
  }

  addTip = ({
    item,
    percent
  }) => {
    const {
      config: {
        xKey
      }
    } = this.props
    const textStyle = {}

    const tip = {
      name: item[xKey],
      percent: (percent * 100 >> 0) + '%',
      textStyle
    }

    this.setState({ tip })
  }


  render () {
    const {
      config
    } = this.props
    const {
      tip
    } = this.state

    return (
      <Base name='ring' config={config}>
        <div className="ring-canvas-wrap">
          <canvas
            ref={this.bgCanvasRef}
            width={config.width}
            height={config.height}
          />
          <canvas
            ref={this.dataCanvasRef}
            width={config.width}
            height={config.height}
          />
          {
            tip && <div className="text" style={tip.textStyle}>
              {tip.name}
              <div className="per">{tip.percent}</div>
            </div>
          }
        </div>
      </Base>
    )
  }
}

export default Ring
