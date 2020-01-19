import React from 'react';
import AppLayout from '../common/AppLayout';
import './style.css';
import PromotionList from './PromotionList';
import CouponsList from './CouponsList';

const Promotions = () => {
  const isManager = true;
  return (
    <AppLayout
      topbarContent={
        <div className="page-title">Promotions</div>
      }
    >
      <div className="promotions">
        {isManager ? <PromotionList/> : <CouponsList/>}
      </div>
    </AppLayout>
  )
}

export default Promotions
