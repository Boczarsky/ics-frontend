import React from 'react';
import AppLayout from '../common/AppLayout';
import './style.css';

const Promotions = () => {
  return (
    <AppLayout
      topbarContent={
        <div className="page-title">Promotions</div>
      }
    >
      <div className="promotions"></div>
    </AppLayout>
  )
}

export default Promotions
