import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveFormData, clearData } from '../../store/home/action'

class NameForm extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
    this.change = this.change.bind(this)
    this.submit = this.submit.bind(this)
  }

  change(event) {
    this.setState({
      value: event.target.value
    })
  }

  submit(event) {
    alert(`您提交的名字${this.state.value}`)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <label>
          名字:
          <input type="text" value={this.state.value} onChange={this.change} />
        </label>
        <input type="submit" value="提交" />
      </form>
    )
  }
}

export default connect(null, { saveFormData, clearData })(NameForm)
