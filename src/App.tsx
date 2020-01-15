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
import EditIcecreamShop from './components/EditIcecreamShop';
import ModalContainer from './components/ModalContainer';
import NotificationContainer from './components/NotificationContainer';

const App: React.FC = () => {
  return (
    <div className="App">
      <ModalContainer/>
      <NotificationContainer/>
      <Router>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/browse" component={BrowseShops}/>
          <Route path="/my-account" component={MyAccount}/>
          <Route path="/promotions" component={Promotions}/>
          <Route path="/news-feed" component={NewsFeed}/>
          <Route path="/employees" component={Employees}/>
          <Route path="/icecream-shops/create" component={EditIcecreamShop}/>
          <Route path="/icecream-shops/edit/:id" component={EditIcecreamShop}/>
          <Route path="/icecream-shops" component={IcecreamShops}/>
          <Route path="/" exact component={Dashboard}/>
          <Route path="*" component={PageNotFound}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
