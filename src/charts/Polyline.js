import React from 'react'
import PropTypes from 'prop-types'
import Base from './Base'
import '../styles/polyline.less'

class Polyline extends React.PureComponent {
  static propTypes = {
    data: PropTypes.array,
    config: PropTypes.object
  }

  renderData = () => {
    return 'polylineChart'
  }

  render () {
    const {
      config
    } = this.props

    return (
      <Base name='polyline' config={config}>
        {this.renderData()}
      </Base>
    )
  }
}

export default Polyline
