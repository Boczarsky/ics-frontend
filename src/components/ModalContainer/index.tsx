import React from 'react';
import { useSelector } from 'react-redux';
import './style.css';
import AddPointsModal from './AddPointsModal';
import RedeemCouponModal from './RedeemCouponModal';

const ModalContainer = () => {
  const addPoints = useSelector((state: any) => state.modals.addPoints);
  const redeemCoupon = useSelector((state: any) => state.modals.redeemCoupon);
  return (
    <div className="modal-container">
      {addPoints && <AddPointsModal/>}
      {redeemCoupon && <RedeemCouponModal/>}
    </div>
  )
}

export default ModalContainer
