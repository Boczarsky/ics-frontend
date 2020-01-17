import React, { MouseEvent } from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../reducers/Modals/actions';
import { pushNotification } from '../../../reducers/Notifications/operations';
import BasicInput from '../../common/BasicInput';

const CreatePromotionModal = () => {
  const dispatch = useDispatch();
  const closeModalWindow = (event: MouseEvent<HTMLDivElement>) => {
    const target: any = event.target;
    if (target.classList.contains('modal-overlay')) {
      dispatch(closeModal('createPromotion'));
    }
  }
  const handleCreatePromotion = () => {
    dispatch(closeModal('createPromotion'));
    dispatch(pushNotification('Promotion created successfuly', 'normal', 2000));
  }
  return (
    <div className="modal-overlay" onClick={closeModalWindow}>
      <div className="modal-wrapper create-promotion-modal">
        <BasicInput inputProps={{id:'promotion-info', rows: 5}} label="Info" textarea/>
        <BasicInput inputProps={{id:'promotion-prize'}} label="Prize"/>
        <BasicInput inputProps={{id:'promotion-limit', type: 'number'}} label="Limit"/>
        <BasicInput inputProps={{id:'promotion-start-date', type: 'date'}} label="Start date"/>
        <BasicInput inputProps={{id:'promotion-end-date', type: 'date'}} label="End date"/>
        <div className="b-button p-font clickable create-promotion-modal__button" onClick={handleCreatePromotion}>Create promotion</div>
      </div>
    </div>
  )
};

export default CreatePromotionModal;
