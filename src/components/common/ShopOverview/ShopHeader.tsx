import React from 'react';
import './style.css';

export interface ShopHeaderData {
  logoUrl: string;
  name: string;
  address: string;
}
export interface ShopHeaderProps {
  headerData: ShopHeaderData;
}

const ShopHeader = (props: ShopHeaderProps) => {
  const {logoUrl, name, address} = props.headerData;
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
