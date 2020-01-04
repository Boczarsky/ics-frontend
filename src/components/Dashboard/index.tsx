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
      <LabeledSection label="Favorite" contentClass="dashboard__favorite">
        {favoriteShops.map((shop: any) => (
          <ShopOverview
            key={randomKey()}
            header={{logoUrl: shop.logoUrl, name: shop.name, address: shop.address}}
            flavours={shop.flavours || []}
            follows={shop.follows || 0}
          />
        ))}
      </LabeledSection>
    </div>
  )
};

export default Dashboard;