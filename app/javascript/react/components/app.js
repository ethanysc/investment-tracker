import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

export const App = (props) => {
  return (
    <Router history={browserHistory} >
      <Route path='/' >
        <IndexRoute component={} />
      </Route>
    </Router>
  )
}

export default App
