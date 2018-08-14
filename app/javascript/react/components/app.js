import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router'

import AllStocksContainer from '../containers/stocks/AllStocksContainer'
import StocksIndexContainer from '../containers/stocks/StocksIndexContainer'
import StockShowContainer from '../containers/stocks/StockShowContainer'

export const App = (props) => {
  return (
    <Router history={browserHistory} >
      <Route path='/' >
        <IndexRoute component={StocksIndexContainer}/>
        <Route path='/stocks' component={AllStocksContainer} />
        <Route path='/stocks/:id' component={StockShowContainer} />
      </Route>
    </Router>
  )
}

export default App
