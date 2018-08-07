import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router'

import PortfolioIndexContainer from '../containers/PortfolioIndexContainer'

export const App = (props) => {
  return (
    <Router history={browserHistory} >
      <Route path='/' >
        <IndexRoute component={PortfolioIndexContainer}/>
      </Route>
    </Router>
  )
}

export default App
