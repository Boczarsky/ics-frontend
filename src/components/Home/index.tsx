import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Dashboard } from './Dashboard'
import { SearchShops } from './SearchShops'

export const Home = () => {
  return (
    <div className="home">
      HOME PAGE
      <Router>
        <Switch>
          <Route path="/search">
            <SearchShops/>
          </Route>
          <Route path="/">
            <Dashboard/>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}
