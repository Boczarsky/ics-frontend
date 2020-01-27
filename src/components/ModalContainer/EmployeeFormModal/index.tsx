import React, { MouseEvent, useReducer, useEffect } from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../reducers/Modals/actions';
import { pushNotification } from '../../../reducers/Notifications/operations';
import BasicInput from '../../common/BasicInput';
import { reducer, initialState, setValue, setInitial } from './formReducer';

export interface EmployeeFormModalProps {
  data: any;
}

const EmployeeFormModal = (props: EmployeeFormModalProps) => {
  const { data } = props;
  const [state, formDispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    formDispatch(setInitial(data));
  }, [data])
  const isEdit = Boolean(data.id);
  const dispatch = useDispatch();
  const closeModalWindow = (event: MouseEvent<HTMLDivElement>) => {
    const target: any = event.target;
    if (target.classList.contains('modal-overlay')) {
      dispatch(closeModal('employeeForm'));
    }
  }
  const handleEmployeeForm = () => {
    dispatch(closeModal('employeeForm'));
    if (isEdit) {
      dispatch(pushNotification('Employee edited successfuly', 'normal', 2000));
    } else {
      dispatch(pushNotification('Employee created successfuly', 'normal', 2000));
    }
  }
  return (
    <div className="modal-overlay" onClick={closeModalWindow}>
      <div className="modal-wrapper employee-form-modal">
        <BasicInput inputProps={{id:'employee-login', value: state.login.value}} label="Username" handleChange={value => formDispatch(setValue('login', value))}/>
        <BasicInput inputProps={{id:'employee-email', type: 'email', value: state.email.value}} label="Email" handleChange={value => formDispatch(setValue('email', value))}/>
        <BasicInput inputProps={{id:'employee-first-name', value: state.firstName.value}} label="First name" handleChange={value => formDispatch(setValue('firstName', value))}/>
        <BasicInput inputProps={{id:'employee-last-name', value: state.lastName.value}} label="Last name" handleChange={value => formDispatch(setValue('lastName', value))}/>
        <BasicInput inputProps={{id:'employee-password', type: 'password', value: state.password.value}} label="Password" handleChange={value => formDispatch(setValue('password', value))}/>
        <BasicInput inputProps={{id:'employee-re-password', type: 'password', value: state.rePassword.value}} label="Re-Password" handleChange={value => formDispatch(setValue('rePassword', value))}/>
        <div className="b-button p-font clickable employee-form-modal__button" onClick={handleEmployeeForm}>{isEdit ? 'Edit' : 'Create'}</div>
      </div>
    </div>
  )
};

export default EmployeeFormModal;