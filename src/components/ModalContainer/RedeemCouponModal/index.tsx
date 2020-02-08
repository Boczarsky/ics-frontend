import React, { MouseEvent } from 'react';
import BasicInput from '../../common/BasicInput';
import './style.css';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../reducers/Modals/actions';
import { pushNotification } from '../../../reducers/Notifications/operations';

const RedeemCouponModal = () => {
  const dispatch = useDispatch();
  const closeModalWindow = (event: MouseEvent<HTMLDivElement>) => {
    const target: any = event.target;
    if (target.classList.contains('modal-overlay')) {
      dispatch(closeModal('redeemCoupon'));
    }
  }
  const handleRedeemCoupon = () => {
    dispatch(closeModal('redeemCoupon'));
    dispatch(pushNotification('Coupon redeemed', 'normal', 2000));
  }
  return (
    <div className="modal-overlay" onMouseDown={closeModalWindow}>
      <div className="modal-wrapper redeem-coupon-modal">
        <BasicInput inputProps={{id:'coupon-id'}} label="Coupon id"/>
        <div className="b-button p-font clickable redeem-coupon-modal__button" onClick={handleRedeemCoupon}>Redeem coupon</div>
      </div>
    </div>
  )
};

export default RedeemCouponModal;
