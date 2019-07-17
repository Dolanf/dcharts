import React from 'react'
import PropTypes from 'prop-types'
import Base from './Base'
import '../styles/pie.less'

class Pie extends React.PureComponent {
  static propTypes = {
    data: PropTypes.array,
    config: PropTypes.object
  }

  renderData = () => {
    return 'pieChart'
  }

  render () {
    const {
      config
    } = this.props

    return (
      <Base name='pie' config={config}>
        {this.renderData()}
      </Base>
    )
  }
}

export default Pie
