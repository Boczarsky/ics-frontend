import React from 'react';
import AppLayout from '../common/AppLayout';
import './style.css';
import { Link } from 'react-router-dom';

const IcecreamShops = () => {
  return (
    <AppLayout
      topbarContent={
        <div className="page-title">Icecream shops</div>
      }
    >
      <div className="icecream-shops">
        <Link to="/icecream-shops/create"><div className="b-button">+ Create icecream shop</div></Link>
      </div>
    </AppLayout>
  )
}

export default IcecreamShops
