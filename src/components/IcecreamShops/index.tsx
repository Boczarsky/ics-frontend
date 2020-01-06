import React from 'react';
import AppLayout from '../common/AppLayout';
import './style.css';

const IcecreamShops = () => {
  return (
    <AppLayout
      topbarContent={
        <div className="page-title">Icecream shops</div>
      }
    >
      <div className="icecream-shops"></div>
    </AppLayout>
  )
}

export default IcecreamShops
