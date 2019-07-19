import React from 'react'
import PropTypes from 'prop-types'
import Base from './Base'
import { bgColor, chartColors, fontColor, areaColor } from '../constants/color'
import '../styles/polyline.less'

class Polyline extends React.PureComponent {
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
    tips: []
  }

  componentDidMount() {
    this.drawBgGrid()
    this.addNameTips()
    this.drawData()
  }

  drawBgGrid = () => {
    const {
      data,
      config: {
        width,
        height
      }
    } = this.props
    
    const r = width/2
    const ctx = this.bgCanvasRef.current.getContext('2d')

    ctx.beginPath()
    
    // horizontal grid lines
    const hStep = 10
    for(let i=0; i<=hStep; i++) {
        const y = height / hStep * i
        ctx.moveTo(0,y)
        ctx.lineTo(width, y)
    }

    // vertical grid lines
    const vStep = data.length + 1
    for(let i=0; i<=vStep; i++) {
        const x = width / vStep * i
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
    }

    ctx.strokeStyle = bgColor
    ctx.lineWidth = 2
    ctx.stroke()
  }

  addNameTips = () => {
    const {
      data,
      config: {
        width,
        xKey
      }
    } = this.props
    
    const newTips = []
    const vStep = data.length + 1
    data.forEach((item, idx) => {
      const textWidth = width / vStep >> 0
      const x = width / vStep * idx
      const left = x + textWidth / 2

      newTips.push({
        name: item[xKey],
        textStyle: {
          left,
          width: textWidth
        }
      })
    })
   
    this.setState({ tips: newTips })
  }

  drawData = () => {
    const {
      data,
      config: {
        yKey,
        width,
        height
      }
    } = this.props

    const colors = [...chartColors]
    const ctx = this.dataCanvasRef.current.getContext('2d')
    const item_w = width / (data.length + 1)

    // draw line
    ctx.beginPath()
    ctx.moveTo(0, height)
    for(let i in data) {
        const item = data[i]
        const percent = parseInt(item[yKey], 10) / 100

        const x = item_w * i + item_w
        const y = height - height * percent
        ctx.lineTo(x, y)
    }
    ctx.lineTo(width, height)
    ctx.strokeStyle = colors[0]
    ctx.fillStyle = areaColor
    ctx.stroke()
    ctx.fill()

    // draw point
    for(let i in data) {
      const item = data[i]
      const percent = parseInt(item[yKey], 10) / 100

      const x = item_w * i + item_w
      const y = height - height * percent
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.arc(x, y, 3, 0, 2 * Math.PI)

      ctx.strokeStyle = item.color ? item.color : colors.pop()
      ctx.fillStyle = ctx.strokeStyle
      ctx.stroke()
      ctx.fill()

      ctx.fillStyle = fontColor
      ctx.fillText(( percent * 100 >> 0 ) + '%', x-13, y-20)
    }
  }

  render () {
    const {
      config
    } = this.props
    const {
      tips = []
    } = this.state

    return (
      <Base name='polyline' config={config}>
        <div className="polyline-canvas-wrap">
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
            tips.map(({ name, textStyle }) => (
              <div className='text' style={textStyle} key={name}>
                {name}
              </div>
            ))
          }
        </div>
      </Base>
    )
  }
}

export default Polyline
