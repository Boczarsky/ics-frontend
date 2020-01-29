import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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
import IcecreamShopForm from './components/IcecreamShopForm';
import ModalContainer from './components/ModalContainer';
import NotificationContainer from './components/NotificationContainer';
import ViewIcecreamShop from './components/ViewIcecreamShop';
import { useSelector } from 'react-redux';

const App: React.FC = () => {
  const isLoggedIn = useSelector((state: any) => state.auth.loggedIn);
  return (
    <div className="App">
      <ModalContainer/>
      <NotificationContainer/>
      <Router>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          {!isLoggedIn && <Redirect path="*" to="/login"/>}
          <Route path="/browse/:id" component={ViewIcecreamShop}/>
          <Route path="/browse" component={BrowseShops}/>
          <Route path="/my-account" component={MyAccount}/>
          <Route path="/promotions" component={Promotions}/>
          <Route path="/news-feed" component={NewsFeed}/>
          <Route path="/employees" component={Employees}/>
          <Route path="/icecream-shops/create" component={IcecreamShopForm}/>
          <Route path="/icecream-shops/edit/:id" component={IcecreamShopForm}/>
          <Route path="/icecream-shops" exact component={IcecreamShops}/>
          <Route path="/" exact component={Dashboard}/>
          <Route path="*" component={PageNotFound}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
