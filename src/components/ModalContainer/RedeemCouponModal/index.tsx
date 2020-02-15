import React, { MouseEvent, useState } from 'react';
import BasicInput from '../../common/BasicInput';
import './style.css';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../reducers/Modals/actions';
import { pushNotification } from '../../../reducers/Notifications/operations';
import { dataProvider } from '../../../utils/requestBuilder';
import { useTranslation } from 'react-i18next';

const RedeemCouponModal = () => {
  const dispatch = useDispatch();
  const [couponId, setCouponId] = useState('');
  const closeModalWindow = (event: MouseEvent<HTMLDivElement>) => {
    const target: any = event.target;
    if (target.classList.contains('modal-overlay')) {
      dispatch(closeModal('redeemCoupon'));
    }
  }
  const handleRedeemCoupon = () => {
    if (couponId) {
      dataProvider().post('promotions/coupon/redeem', {couponId: Number(couponId)})
      .then(() => {
        dispatch(closeModal('redeemCoupon'));
        dispatch(pushNotification('Coupon redeemed', 'normal', 2000));
      })
      .catch((error) => {
        if (error.response && error.response.data.message === 'RequirementsNotMet') {
          dispatch(pushNotification('Coupon is not ready', 'normal', 2000));
        } else {
          dispatch(pushNotification('Error during coupon redeem', 'error', 2000));
        }
      });
    }
  }
  const { t } = useTranslation();
  return (
    <div className="modal-overlay" onMouseDown={closeModalWindow}>
      <div className="modal-wrapper redeem-coupon-modal">
        <BasicInput inputProps={{id:'coupon-id', value: couponId}} label="Coupon id" handleChange={setCouponId}/>
        <div className="b-button p-font clickable redeem-coupon-modal__button" onClick={handleRedeemCoupon}>{t('Redeem coupon')}</div>
      </div>
    </div>
  )
};

export default RedeemCouponModal;
