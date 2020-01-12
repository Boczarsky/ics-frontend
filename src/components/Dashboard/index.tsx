import React from 'react';
import './style.css';
import SearchShops from './SearchShops';
import AppMenu from '../common/AppMenu';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard__menu-wrapper">
        <AppMenu/>
      </div>
      <SearchShops/>
    </div>
  )
};

export default Dashboard;