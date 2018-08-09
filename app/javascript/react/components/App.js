import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router'

import PortfolioContainer from '../containers/portfolio/PortfolioContainer'
import StocksIndexContainer from '../containers/stocks/StocksIndexContainer'

export const App = (props) => {
  return (
    <Router history={browserHistory} >
      <Route path='/' >
        <IndexRoute component={PortfolioContainer}/>
        <Route path='/stocks' component={StocksIndexContainer} />
      </Route>
    </Router>
  )
}

export default App
