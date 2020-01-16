import React, { Component } from 'react'

import './navbar.css'
export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 1,
      isLogin: false, // 是否登录
      menus: [
        {
          id: 1,
          name: '首页'
        },
        {
          id: 2,
          name: '购物车'
        },
        {
          id: 3,
          name: '我的'
        }
      ]
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogut = this.handleLogut.bind(this)
    this.nav = this.nav.bind(this)
  }
  handleLogin() {
    this.setState({
      isLogin: false
    })
  }
  handleLogut() {
    this.setState({
      isLogin: true
    })
  }
  nav(id, e) {
    this.setState(state => ({
      isOff: !state.isOff,
      active: id
    }))

    console.log(e, 'ee')
    console.log(this.state.active)
  }

  render() {
    const isLogin = this.state.isLogin
    let btn = isLogin ? (
      <button onClick={this.handleLogin}>登录组件</button>
    ) : (
      <button onClick={this.handleLogut}>登出组件</button>
    )
    return (
      <div>
        {btn}
        <ul className="container">
          {this.state.menus.map((menu, index) => {
            return (
              <li
                className="item"
                onClick={this.nav.bind(this, menu.id)}
                key={menu.id}
              >
                {menu.name}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
