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
import CreateIcecreamShop from './components/CreateIcecreamShop';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/browse" component={BrowseShops}/>
          <Route path="/my-account" component={MyAccount}/>
          <Route path="/promotions" component={Promotions}/>
          <Route path="/news-feed" component={NewsFeed}/>
          <Route path="/employees" component={Employees}/>
          <Route path="/icecream-shops/create" component={CreateIcecreamShop}/>
          <Route path="/icecream-shops" component={IcecreamShops}/>
          <Route path="/" exact component={Dashboard}/>
          <Route path="*" component={PageNotFound}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
