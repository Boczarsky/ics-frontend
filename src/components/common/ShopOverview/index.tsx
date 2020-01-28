import React from 'react';
import ShopHeader from './ShopHeader';
import FlavourInfo from './FlavourInfo';
import randomKey from '../../../utils/randomKey';
import './style.css';

export interface ShopOverviewProps {
  data: any;
  handleClick: (data: any) => any;
}

const ShopOverview = (props: ShopOverviewProps) => {
  const { data, handleClick = () => {} } = props;
  const header = { name: data.name, logoUrl: data.logoUrl, address: data.address };
  const flavours = data.flavours;
  const follows = data.follows;
  return (
    <div className="shop-overview" onClick={() => handleClick(data)}>
      <div className="shop-overview__left-wrapper">
        <ShopHeader headerData={header}/>
        <div className="shop-overview__flavours">
          {flavours.map((flavour: any) => 
            <FlavourInfo {...flavour} key={randomKey()}/>
          )}
        </div>
      </div>
      <div className="shop-overview__right-wrapper">
        <div className="shop-overview__follows">
            <span className="shop-overview__follow-count">{follows}</span>
            <span role="img" aria-label="follows">💛</span>
        </div>
      </div>
    </div>
  )
}

export default ShopOverview
