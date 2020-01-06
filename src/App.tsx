import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import BrowseShops from './components/BrowseShops';
import MyAccount from './components/MyAccount';
import Promotions from './components/Promotions';
import NewsFeed from './components/NewsFeed';
import Employees from './components/Employees';
import IcecreamShops from './components/IcecreamShops';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/browse">
            <BrowseShops/>
          </Route>
          <Route path="/my-account">
            <MyAccount/>
          </Route>
          <Route path="/promotions">
            <Promotions/>
          </Route>
          <Route path="/news-feed">
            <NewsFeed/>
          </Route>
          <Route path="/employees">
            <Employees/>
          </Route>
          <Route path="/icecream-shops">
            <IcecreamShops/>
          </Route>
          <Route path="/" exact>
            <Dashboard/>
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
