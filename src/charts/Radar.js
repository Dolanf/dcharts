import React from 'react'
import PropTypes from 'prop-types'
import Base from './Base'
import '../styles/radar.less'

class Radar extends React.PureComponent {
  static propTypes = {
    data: PropTypes.array,
    config: PropTypes.object
  }

  renderData = () => {
    return 'radarChart'
  }

  render () {
    const {
      config
    } = this.props

    return (
      <Base name='radar' config={config}>
        {this.renderData()}
      </Base>
    )
  }
}

export default Radar
