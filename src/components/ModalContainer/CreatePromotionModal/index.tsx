import React, { MouseEvent, useReducer } from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../reducers/Modals/actions';
import { pushNotification } from '../../../reducers/Notifications/operations';
import BasicInput from '../../common/BasicInput';
import { reducer, initialState, setValue } from './formReducer';
import { fetchPromotions } from '../../../reducers/Promotions/operations';
import { dataProvider } from '../../../utils/requestBuilder';

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
    const data = {
      info: state.info.value,
      limit: Number(state.limit.value),
      prize: state.prize.value,
      startDate: new Date(state.startDate.value).toISOString(),
      endDate: new Date(state.endDate.value).toISOString(),
    };
    dataProvider().post('promotions/create', data)
      .then(() => {
        dispatch(fetchPromotions());
        dispatch(closeModal('createPromotion'));
        dispatch(pushNotification('Promotion created successfuly', 'normal', 2000));
      })
      .catch(() => {
        dispatch(pushNotification('Error during creating promotion', 'error', 2000));
      })
  }
  return (
    <div className="modal-overlay" onMouseDown={closeModalWindow}>
      <div className="modal-wrapper create-promotion-modal">
        <BasicInput
          inputProps={{id:'promotion-info', rows: 5, value: state.info.value}}
          label="Info"
          textarea
          handleChange={value => formDispatch(setValue('info', value))}
          validationError={state.info.error}
        />
        <BasicInput
          inputProps={{id:'promotion-prize', value: state.prize.value}}
          label="Prize"
          handleChange={value => formDispatch(setValue('prize', value))}
          validationError={state.prize.error}
        />
        <BasicInput
          inputProps={{id:'promotion-limit', type: 'number', value: state.limit.value}}
          label="Limit"
          handleChange={value => formDispatch(setValue('limit', +value))}
          validationError={state.limit.error}
        />
        <BasicInput
          inputProps={{id:'promotion-start-date', type: 'date', value: state.startDate.value}}
          label="Start date"
          handleChange={value => formDispatch(setValue('startDate', value))}
          validationError={state.startDate.error}
        />
        <BasicInput
          inputProps={{id:'promotion-end-date', type: 'date', value: state.endDate.value}}
          label="End date"
          handleChange={value => formDispatch(setValue('endDate', value))}
          validationError={state.endDate.error}
        />
        <div
          className={`b-button p-font clickable create-promotion-modal__button ${state.formValid ? '' : 'disabled'}`}
          onClick={state.formValid ? handleCreatePromotion : undefined}
        >
          Create promotion
        </div>
      </div>
    </div>
  )
};

export default CreatePromotionModal;
