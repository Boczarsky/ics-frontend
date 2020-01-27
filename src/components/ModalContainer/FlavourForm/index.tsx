import React, { MouseEvent, useReducer, useEffect } from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../reducers/Modals/actions';
import { pushNotification } from '../../../reducers/Notifications/operations';
import BasicInput from '../../common/BasicInput';
import TagsInput from '../../common/TagsInput';
import { reducer, initialState, setValue, setInitial } from './formReducer';

export interface FlavourFormModalProps {
  data: any;
}

const FlavourFormModal = (props: FlavourFormModalProps) => {
  const { data } = props;
  const [state, formDispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    formDispatch(setInitial(data))
  }, [data])
  const dispatch = useDispatch();
  const closeModalWindow = (event: MouseEvent<HTMLDivElement>) => {
    const target: any = event.target;
    if (target.classList.contains('modal-overlay')) {
      dispatch(closeModal('flavourForm'));
    }
  }
  const handleFlavourForm = () => {
    dispatch(closeModal('flavourForm'));
    if (data.id) {
      dispatch(pushNotification('Flavour edited successfuly', 'normal', 2000));
    } else {
      dispatch(pushNotification('Flavour created successfuly', 'normal', 2000));
    }
  }
  return (
    <div className="modal-overlay" onClick={closeModalWindow}>
      <div className="modal-wrapper flavour-form-modal">
        <BasicInput inputProps={{id:'flavour-name', value: state.name.value}} handleChange={value => formDispatch(setValue('name', value))} label="Flavour name"/>
        <BasicInput inputProps={{id:'flavour-composition', rows: 5, value: state.composition.value}} handleChange={value => formDispatch(setValue('composition', value))} label="Composition" textarea/>
        <TagsInput tags={state.tags.value} label="#Tags" handleChange={value => formDispatch(setValue('tags', value))}/>
        <div className="b-button p-font clickable flavour-form-modal__button" onClick={handleFlavourForm}>{data.id ? 'Edit' : 'Create'}</div>
      </div>
    </div>
  )
};

export default FlavourFormModal;