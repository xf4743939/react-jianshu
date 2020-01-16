import React, { Component } from 'react'
import { NavLink, Route, Redirect, Switch } from 'react-router-dom'

import { fromJS, is } from 'immutable'
import Header from '../../components/header/header.js'
import RecordList from '../../components/record_list/record-list'

import './record.css'

export default class Record extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
    this.state = {
      type: ''
    }
  }

  setType = type => {
    this.setState(() => ({
      type
    }))
  }

  componentWillReceiveProps(nextProps) {
    const curtype = this.props.location.pathname.split('/')[2]
    const type = nextProps.location.pathname.split('/')[2]
    if (curtype !== type) {
      this.setType(type)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.props), fromJS(nextProps)) ||
      !is(fromJS(this.state), fromJS(nextState))
    )
  }

  componentWillMount() {
    const type = this.props.location.pathname.split('/')[2]
    this.setType(type)
  }

  render() {
    return (
      <div className="record-main">
        <Header title="记录"></Header>
        <section className="record-nav">
          <NavLink
            to={`${this.props.match.path}/passed`}
            className={`nav-link ${
              this.state.type === 'passed' ? 'active' : ''
            }`}
          >
            已通过
          </NavLink>
          <NavLink
            to={`${this.props.match.path}/audited`}
            className={`nav-link ${
              this.state.type === 'audited' ? 'active' : ''
            }`}
          >
            待审核
          </NavLink>
          <NavLink
            to={`${this.props.match.path}/failed`}
            className={`nav-link ${
              this.state.type === 'failed' ? 'active' : ''
            }`}
          >
            未通过
          </NavLink>
        </section>
        {/* 子路由由父路由配置 */}
        <Switch>
          <Route
            path={`${this.props.match.path}/:type`}
            component={RecordList}
          ></Route>
          <Redirect
            from={`${this.props.match.path}`}
            to={`${this.props.match.path}/passed`}
            exact
            component={RecordList}
          ></Redirect>
        </Switch>
      </div>
    )
  }
}
