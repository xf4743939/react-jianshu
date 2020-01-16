import React from 'react'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader'
import RouteConfig from './router/router.js'
import store from './store/store.js'

class App extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Provider store={store}>
        <RouteConfig></RouteConfig>
      </Provider>
    )
  }
}

export default hot(module)(App)
