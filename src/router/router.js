import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Home from '../pages/home/index'
import Product from '../pages/product/product'
import Record from '../pages/record/record'
import Help from '../pages/help/help'

class RouteConfig extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/product" component={Product}></Route>
          <Route path="/record" component={Record}></Route>
          <Route path="/help" component={Help}></Route>
        </Switch>
      </HashRouter>
    )
  }
}

export default RouteConfig
