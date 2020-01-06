import React from 'react';
import './style.css';
import SearchShops from './SearchShops';
import LabeledSection from '../common/LabeledSection';
import ShopOverview from '../common/ShopOverview';
import randomKey from '../../utils/randomKey';
import AppMenu from '../common/AppMenu';

const Dashboard = () => {
  const favoriteShops = [
    {
      logoUrl: '', name: 'Cool Icecream Shop Name Prim', address: 'Some St. 1105/15, City 14-510',
      follows: 123, flavours: []
    },
  ];
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