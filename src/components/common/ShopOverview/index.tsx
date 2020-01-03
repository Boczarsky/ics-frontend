import React from 'react';
import ShopHeader, { ShopHeaderProps } from './ShopHeader';
import FlavourInfo, { FlavourInfoProps } from './FlavourInfo';
import randomKey from '../../../utils/randomKey';
import './style.css';

export interface ShopOverviewProps {
  header: ShopHeaderProps;
  flavours: FlavourInfoProps[];
  follows: number;
}

const ShopOverview = (props: ShopOverviewProps) => {
  const {header, flavours, follows} = props;
  return (
    <div className="shop-overview">
      <div className="shop-overview__left-wrapper">
        <ShopHeader {...header}/>
        <div className="shop-overview__flavours">
          {flavours.map((flavour) => 
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
