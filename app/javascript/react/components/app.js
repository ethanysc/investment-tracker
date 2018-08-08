import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router'

import PortfolioContainer from '../containers/portfolio/PortfolioContainer'
import StockIndexContainer from '../containers/stocks/StockIndexContainer'

export const App = (props) => {
  return (
    <Router history={browserHistory} >
      <Route path='/' >
        <IndexRoute component={PortfolioContainer}/>
        <Route path='/stocks' component={StockIndexContainer} />
      </Route>
    </Router>
  )
}

export default App
