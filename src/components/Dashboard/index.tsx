import React from 'react';
import './style.css';
import SearchShops from './SearchShops';
import LabeledSection from '../common/LabeledSection';
import ShopOverview from '../common/ShopOverview';
import randomKey from '../../utils/randomKey';

const Dashboard = () => {
  const favoriteShops = [
    {
      logoUrl: '', name: 'Cool Icecream Shop Name Prim', address: 'Some St. 1105/15, City 14-510',
      follows: 123, flavours: []
    },
    {
      logoUrl: '', name: 'Cool Icecream Shop Name Bis', address: 'Some St. 1105/15, City 14-510',
      follows: 123, flavours: [
        {name: 'Strawberry Dream', reactions: [105,15,2]},
        {name: 'Mango Morning', reactions: [105,15,2]},
        {name: 'Berry Night', reactions: [105,15,2]}
      ]
    },
    {
      logoUrl: '', name: 'Cool Icecream Shop Name Tetr', address: 'Some St. 1105/15, City 14-510',
      follows: 123, flavours: [
        {name: 'Strawberry Dream', reactions: [105,15,2]},
        {name: 'Mango Morning', reactions: [105,15,2]},
        {name: 'Berry Night', reactions: [105,15,2]}
      ]
    }
  ];
  return (
    <div className="dashboard">
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