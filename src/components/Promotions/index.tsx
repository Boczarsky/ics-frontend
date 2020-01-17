import React from 'react';
import AppLayout from '../common/AppLayout';
import './style.css';
import PromotionList from './PromotionList';

const Promotions = () => {
  return (
    <AppLayout
      topbarContent={
        <div className="page-title">Promotions</div>
      }
    >
      <div className="promotions">
        <PromotionList/>
      </div>
    </AppLayout>
  )
}

export default Promotions
