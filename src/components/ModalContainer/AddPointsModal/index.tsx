import React, { MouseEvent, useState } from 'react';
import BasicInput from '../../common/BasicInput';
import './style.css';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../reducers/Modals/actions';
import { pushNotification } from '../../../reducers/Notifications/operations';
import { dataProvider } from '../../../utils/requestBuilder';

const AddPointsModal = () => {
  const dispatch = useDispatch();
  const [couponId, setCouponId] = useState('');
  const closeModalWindow = (event: MouseEvent<HTMLDivElement>) => {
    const target: any = event.target;
    if (target.classList.contains('modal-overlay')) {
      dispatch(closeModal('addPoints'));
    }
  }
  const handleAddPoints = () => {
    if (couponId) {
      dataProvider().post('promotions/coupon/reward', {couponId: Number(couponId)})
      .then(() => {
        dispatch(closeModal('addPoints'));
        dispatch(pushNotification('Point added to coupon', 'normal', 2000));
      })
      .catch((error) => {
        if (error.response.data.message === 'RequirementsNotMet') {
          dispatch(pushNotification('Coupon is full', 'normal', 2000));
        } else {
          dispatch(pushNotification('Error during adding points', 'error', 2000));
        }
      });
    }
  }
  return (
    <div className="modal-overlay" onMouseDown={closeModalWindow}>
      <div className="modal-wrapper add-points-modal">
        <BasicInput inputProps={{id:'coupon-id', value: couponId}} label="Coupon id" handleChange={setCouponId}/>
        <div className={`b-button p-font clickable add-points-modal__button ${couponId ? '' : 'disabled'}`} onClick={handleAddPoints}>Add points</div>
      </div>
    </div>
  )
};

export default AddPointsModal;
