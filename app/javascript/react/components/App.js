import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router'

import AllStocksContainer from '../containers/stocks/AllStocksContainer'
import StocksIndexContainer from '../containers/stocks/StocksIndexContainer'
import StocksShowContainer from '../containers/stocks/StocksShowContainer'

export const App = (props) => {
  return (
    <Router history={browserHistory} >
      <Route path='/' >
        <IndexRoute component={StocksIndexContainer}/>
        <Route path='/stocks' component={AllStocksContainer} />
        <Route path='/stocks/:id' component={StocksShowContainer} />
      </Route>
    </Router>
  )
}

export default App
