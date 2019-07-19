import React from 'react'
import PropTypes from 'prop-types'
import Base from './Base'
import { bgColor, chartColors, maskColor, fontColor } from '../constants/color'
import '../styles/radar.less'

class Radar extends React.PureComponent {
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
        width
      }
    } = this.props

    const r = width / 2
    const ctx = this.bgCanvasRef.current.getContext('2d')
    const step = data.length

    // draw bg
    for(let i=10; i>0; i--) {
      ctx.beginPath()
      for(let s=0; s<step; s++) {
          const angle = (2 * Math.PI / step) * s
          const x = r + Math.sin(angle) * r * (i/10)
          const y= r + Math.cos(angle) * r * (i/10)
          ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.fillStyle = (i % 2) ? maskColor : bgColor
      ctx.fill()
    }

    // draw line
    for(let i = 0; i<step; i++) {
      const angle = (2 * Math.PI / step) * i
      const x = r + Math.sin(angle) * r
      const y= r + Math.cos(angle) * r
      ctx.moveTo(r, r)
      ctx.lineTo(x, y)
    }
    ctx.strokeStyle = bgColor
    ctx.stroke()
  }

  addNameTips = () => {
    const {
      data,
      config: {
        width,
        xKey,
        height
      }
    } = this.props

    const newTips = []
    const step = data.length
    const r = width / 2
    data.forEach((item, i) => {
      const angle = (2 * Math.PI / step) * i
      const x = r + Math.sin(angle) * r
      const y= r + Math.cos(angle) * r
      const textStyle = {}

      if(x < width/2) {
        textStyle.left = x - 15
      }else {
        textStyle.right = width - x - 15
      }

      if(y < height/2) {
        textStyle.top = y - 20
      }else {
        textStyle.bottom = height - y - 20
      }

      newTips.push({
        name: item[xKey],
        textStyle
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
    const step = data.length
    const r = width / 2

    // draw line
    for(let s=0; s<step; s++) {
      const item = data[s]
      const angle = (2 * Math.PI / step) * s
      const percent = parseInt(item[yKey], 10) / 100
      const x = r + Math.sin(angle) * r * percent
      const y= r + Math.cos(angle) * r * percent

      ctx.lineTo(x,y)
    }
    ctx.strokeStyle = colors[0]
    ctx.closePath()
    ctx.stroke()

    // draw point
    for(let s=0; s<step; s++) {
      const item = data[s]
      const angle = (2 * Math.PI / step) * s
      const percent = parseInt(item[yKey], 10) / 100
      const x = r + Math.sin(angle) * r * percent
      const y = r + Math.cos(angle) * r * percent

      ctx.beginPath()
      ctx.arc(x, y, 3, 0, 2 * Math.PI)
      ctx.closePath()
      ctx.fillStyle = ctx.strokeStyle = item.color ? item.color : colors.pop()
      ctx.stroke()
      ctx.fill()

      const tx = x > width / 2 ? x + 5 : x - 15
      const ty = y > height / 2 ? y + 15 : y - 5
      ctx.fillStyle = fontColor
      ctx.fillText(( percent * 100 >> 0 ) + '%', tx, ty)
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
      <Base name='radar' config={config}>
        <div className="radar-canvas-wrap">
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

export default Radar
