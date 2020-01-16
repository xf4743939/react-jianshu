import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { fromJS, is } from 'immutable'
import './header.css'

class Headers extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      navs: [
        { id: 1, name: '首页', path: '/' },
        { id: 2, name: '提现', path: '/withdraw' },
        { id: 3, name: '帮助中心', path: '/help' }
      ]
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState(state => ({
      show: !state.show
    }))
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.props), fromJS(nextProps)) ||
      !is(fromJS(this.state), fromJS(nextState))
    )
  }

  render() {
    const { record, confirm } = this.props
    const { show } = this.state
    return (
      <header className="header-container clearfix">
        <span
          onClick={this.toggle}
          className="icon-left iconfont iconfenlei"
        ></span>
        <div className="title">{this.props.title}</div>
        {record && (
          <NavLink
            className="icon-right iconfont iconwenben"
            to="/record"
          ></NavLink>
        )}
        {confirm && (
          <NavLink className="icon-right header-link" to="/">
            确定
          </NavLink>
        )}
        <TransitionGroup className={`nav-wrap ${show ? 'active' : ''}`}>
          {this.state.navs.map(item => {
            return (
              <CSSTransition timeout={300} classNames={'fade'} key={item.id}>
                <aside onClick={this.toggle}>
                  <NavLink to={item.path} className="nav-link">
                    <span>{item.name}</span>
                    <span className="icon iconfont iconxiangyoujiantou"></span>
                  </NavLink>
                </aside>
              </CSSTransition>
            )
          })}
        </TransitionGroup>
      </header>
    )
  }
}

Headers.propTypes = {
  record: PropTypes.any,
  title: PropTypes.string.isRequired,
  confirm: PropTypes.any
}

Headers.defaultProps = {
  title: '',
  record: ''
}

export default Headers
