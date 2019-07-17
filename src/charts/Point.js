import React from 'react'
import PropTypes from 'prop-types'
import Base from './Base'
import '../styles/point.less'

class Point extends React.PureComponent {
  static propTypes = {
    data: PropTypes.array,
    config: PropTypes.object
  }

  renderData = () => {
    return 'pointChart'
  }

  render () {
    const {
      config
    } = this.props

    return (
      <Base name='point' config={config}>
        {this.renderData()}
      </Base>
    )
  }
}

export default Point
