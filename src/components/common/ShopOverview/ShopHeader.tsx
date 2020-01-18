import React from 'react';
import './style.css';

export interface ShopHeaderProps {
  logoUrl: string;
  name: string;
  address: string;
}

const ShopHeader = (props: ShopHeaderProps) => {
  const {logoUrl, name, address} = props;
  return (
    <div className="shop-header">
      <div className="shop-header__logo">
        {logoUrl && <img src={logoUrl} alt={`${name} logo`}/>}
      </div>
      <div className="shop-header__info">
        <div className="shop-header__name">
          {name}
        </div>
        <div className="shop-header__address">
          {address}
        </div>
      </div>
    </div>
  )
}

export default ShopHeader;
