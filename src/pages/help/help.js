import React, { Component } from 'react'

import Header from '../../components/header/header.js'

import './help.css'

export default class Help extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="help-main">
        <Header title="帮助中心" record={1}></Header>
        <div className="help-top">
          <div className="help-title">介绍</div>
          <div className="help-text">
            本项目主要用于理解 react 和 redux 的编译方式，以及 react + redux
            之间的配合方式
          </div>
        </div>
        <div className="help-content">
          <div className="help-title">技术要点</div>
          <div className="help-item">react</div>
          <div className="help-item">redux</div>
          <div className="help-item">webpack</div>
          <div className="help-item">react-router</div>
          <div className="help-item">ES6/7/8</div>
          <div className="help-item">hot loader</div>
          <div className="help-item">axios</div>
          <div className="help-item">css</div>
        </div>
      </div>
    )
  }
}
