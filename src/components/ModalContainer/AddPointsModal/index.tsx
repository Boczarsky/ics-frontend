import React, { MouseEvent } from 'react';
import BasicInput from '../../common/BasicInput';
import './style.css';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../reducers/Modals/actions';
import { pushNotification } from '../../../reducers/Notifications/operations';

const AddPointsModal = () => {
  const dispatch = useDispatch();
  const closeModalWindow = (event: MouseEvent<HTMLDivElement>) => {
    const target: any = event.target;
    if (target.classList.contains('modal-overlay')) {
      dispatch(closeModal('addPoints'));
    }
  }
  const handleAddPoints = () => {
    dispatch(closeModal('addPoints'));
    dispatch(pushNotification('Point added to coupon', 'normal', 2000));
  }
  return (
    <div className="modal-overlay" onClick={closeModalWindow}>
      <div className="modal-wrapper add-points-modal">
        <BasicInput inputProps={{id:'coupon-id'}} label="Coupon id"/>
        <div className="b-button p-font clickable add-points-modal__button" onClick={handleAddPoints}>Add points</div>
      </div>
    </div>
  )
};

export default AddPointsModal;
