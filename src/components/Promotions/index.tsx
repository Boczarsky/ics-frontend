import React from 'react';
import AppLayout from '../common/AppLayout';
import './style.css';
import PromotionList from './PromotionList';
import CouponsList from './CouponsList';
import { useSelector } from 'react-redux';
import userType from '../../enums/userType';
import { useTranslation } from 'react-i18next';

const Promotions = () => {
  const uType = useSelector((state: any) => state.auth.userType);
  const { t } = useTranslation();
  return (
    <AppLayout
      topbarContent={
        <div className="page-title">{t('Promotions')}</div>
      }
    >
      <div className="promotions">
        {uType === userType.manager ? <PromotionList/> : <CouponsList/>}
      </div>
    </AppLayout>
  )
}

export default Promotions
