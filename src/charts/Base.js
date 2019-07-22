import React from 'react'
import PropTypes from 'prop-types'
import { width, height } from '../constants/base'

class Base extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string,
    config: PropTypes.object
  }

  render () {
    const {
      children,
      name,
      config = {}
    } = this.props

    const divStyle = {
      width: config.width || width,
      height: config.height || height
    }

    return <div className="chart-root" name={`${name}Chart`} style={divStyle}>
      {children}
    </div>
  }
}

export default Base
