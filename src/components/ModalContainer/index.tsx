import React from 'react';
import { useSelector } from 'react-redux';
import './style.css';
import AddPointsModal from './AddPointsModal';
import RedeemCouponModal from './RedeemCouponModal';
import CreatePromotionModal from './CreatePromotionModal';

const ModalContainer = () => {
  const addPoints = useSelector((state: any) => state.modals.addPoints);
  const redeemCoupon = useSelector((state: any) => state.modals.redeemCoupon);
  const createPromotion = useSelector((state: any) => state.modals.createPromotion);
  return (
    <div className="modal-container">
      {addPoints && <AddPointsModal/>}
      {redeemCoupon && <RedeemCouponModal/>}
      {createPromotion && <CreatePromotionModal/>}
    </div>
  )
}

export default ModalContainer
