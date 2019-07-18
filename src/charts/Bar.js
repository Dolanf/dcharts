import React from 'react'
import PropTypes from 'prop-types'
import Base from './Base'
import { getTotalCount } from '../utils/count'
import '../styles/bar.less'

class Bar extends React.PureComponent {
  static propTypes = {
    data: PropTypes.array,
    config: PropTypes.object
  }

  renderData = () => {
    const {
      data,
      config: {
        xKey,
        yKey
      }
    } = this.props
    const total = getTotalCount(data, yKey)

    return data.map((item, idx) => {
      const percent = item[yKey]
      const bgWidth = ((parseInt(percent, 10)/total)*100 >> 0) + '%'
  
      return <div className={'line'} key={idx}>
        <div className={'name'}>{item[xKey]}</div>
        <div className={'rate'} style={{ width: bgWidth }}>
          <div className='bg'></div>
        </div>
        <div className={'count'}>{percent}</div>
      </div>
    })
  }

  render () {
    const {
      config
    } = this.props

    return (
      <Base name='bar' config={config}>
        <div className="bar-chart-wrap">
          {this.renderData()}
        </div>
      </Base>
    )
  }
}

export default Bar
