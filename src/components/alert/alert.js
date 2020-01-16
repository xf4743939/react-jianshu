import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './alert.css'

class Alert extends Component {
  constructor(props) {
    super(props)
    this.confirm = this.confirm.bind(this)
  }
  static propTypes = {
    alertTip: PropTypes.string.isRequired,
    alertStatus: PropTypes.bool.isRequired,
    closeAlert: PropTypes.func.isRequired
  }

  confirm() {
    this.props.closeAlert()
  }

  render() {
    const { alertTip, alertStatus } = this.props

    return (
      <div className="modal-box">
        {alertStatus && <div className="modal-mask"></div>}
        {alertStatus && (
          <div className="modal-main">
            <div className="modal-content">{alertTip}</div>
            <div className="modal-btn" onClick={this.confirm}>
              确定
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Alert
