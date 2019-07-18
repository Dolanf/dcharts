import React from 'react'
import PropTypes from 'prop-types'
import Base from './Base'
import { bgColor, chartColors } from '../constants/color'
import { getTotalCount } from '../utils/count'
import '../styles/pie.less'

class Pie extends React.PureComponent {
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

    const colors = [...chartColors]
    let startAngle = 1.5 * Math.PI
    let endAngle = 0
    const total = getTotalCount(data, yKey)
    const ctx = this.dataCanvasRef.current.getContext('2d')
    const r = width / 2

    const newTips = []
    for(let i=0; i<data.length; i++) {
        const item = data[i]
        const percent = parseInt(item[yKey], 10) / total
        const color = item.color ? item.color : colors.pop()

        endAngle = startAngle + 2 * Math.PI * percent
        ctx.beginPath()
        ctx.moveTo(r, r)
        ctx.arc(r, r, r, startAngle, endAngle)
        ctx.fillStyle = color
        ctx.strokeStyle = color
        ctx.fill()
        ctx.stroke()
        startAngle = endAngle

        const tip = this.getTipObject({item, endAngle, r, percent})
        newTips.push(tip)
    }
    this.setState({ tips: newTips })
  }

  getTipObject = ({
    item,
    endAngle,
    r,
    percent
  }) => {
    const {
      config: {
        xKey,
        width,
        height
      }
    } = this.props

    const textStyle = {}
    const x = r + Math.cos(2 * Math.PI - endAngle) * r
    const y= r + Math.sin(2 * Math.PI - endAngle) * r
  
    if(x < width/2) {
        textStyle.left = y < height/2 ? x + 30 : x - 30
    }else {
        textStyle.right = y < height/2 ? width-x - 30 : width-x + 30
    }

    if(y < height/2) {
        textStyle.bottom = y + 30
    }else {
        textStyle.top = height - y
    }

    return {
      name: item[xKey],
      percent: (percent * 100 >> 0) + '%',
      textStyle
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
      <Base name='pie' config={config}>
        <div className="pie-canvas-wrap">
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
            tips.map(({ name, percent, textStyle }) => (
              <div className="text" style={textStyle} key={name}>
                {name}
                <div className="per">{percent}</div>
              </div>
            ))
          }
        </div>
      </Base>
    )
  }
}

export default Pie
