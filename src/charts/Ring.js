import React from 'react'
import PropTypes from 'prop-types'
import Base from './Base'
import '../styles/ring.less'

class Ring extends React.PureComponent {
  static propTypes = {
    data: PropTypes.array,
    config: PropTypes.object
  }

  renderData = () => {
    return 'RingChart'
  }

  render () {
    const {
      config
    } = this.props

    return (
      <Base name='ring' config={config}>
        {this.renderData()}
      </Base>
    )
  }
}

export default Ring
