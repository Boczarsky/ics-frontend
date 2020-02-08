import React, { MouseEvent, useReducer } from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../reducers/Modals/actions';
import { pushNotification } from '../../../reducers/Notifications/operations';
import BasicInput from '../../common/BasicInput';
import { reducer, initialState, setValue } from './formReducer';

const CreatePromotionModal = () => {
  const [state, formDispatch] = useReducer(reducer, initialState);
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
    <div className="modal-overlay" onMouseDown={closeModalWindow}>
      <div className="modal-wrapper create-promotion-modal">
        <BasicInput inputProps={{id:'promotion-info', rows: 5, value: state.info.value}} label="Info" textarea handleChange={value => formDispatch(setValue('info', value))}/>
        <BasicInput inputProps={{id:'promotion-prize', value: state.prize.value}} label="Prize" handleChange={value => formDispatch(setValue('prize', value))}/>
        <BasicInput inputProps={{id:'promotion-limit', type: 'number', value: state.limit.value}} label="Limit" handleChange={value => formDispatch(setValue('limit', +value))}/>
        <BasicInput inputProps={{id:'promotion-start-date', type: 'date', value: state.startDate.value}} label="Start date" handleChange={value => formDispatch(setValue('startDate', value))}/>
        <BasicInput inputProps={{id:'promotion-end-date', type: 'date', value: state.endDate.value}} label="End date" handleChange={value => formDispatch(setValue('endDate', value))}/>
        <div className="b-button p-font clickable create-promotion-modal__button" onClick={handleCreatePromotion}>Create promotion</div>
      </div>
    </div>
  )
};

export default CreatePromotionModal;
