import React, { MouseEvent } from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../reducers/Modals/actions';
import { pushNotification } from '../../../reducers/Notifications/operations';
import BasicInput from '../../common/BasicInput';

export interface EmployeeFormModalProps {
  data: any;
}

const EmployeeFormModal = (props: EmployeeFormModalProps) => {
  const { data } = props;
  const dispatch = useDispatch();
  const closeModalWindow = (event: MouseEvent<HTMLDivElement>) => {
    const target: any = event.target;
    if (target.classList.contains('modal-overlay')) {
      dispatch(closeModal('employeeForm'));
    }
  }
  const handleEmployeeForm = () => {
    dispatch(closeModal('employeeForm'));
    if (data.employeeId) {
      dispatch(pushNotification('Employee edited successfuly', 'normal', 2000));
    } else {
      dispatch(pushNotification('Employee created successfuly', 'normal', 2000));
    }
  }
  return (
    <div className="modal-overlay" onClick={closeModalWindow}>
      <div className="modal-wrapper employee-form-modal">
        <BasicInput inputProps={{id:'employee-login'}} label="Username"/>
        <BasicInput inputProps={{id:'employee-email', type: 'email'}} label="Email"/>
        <BasicInput inputProps={{id:'employee-first-name'}} label="First name"/>
        <BasicInput inputProps={{id:'employee-last-name'}} label="Last name"/>
        <BasicInput inputProps={{id:'employee-password', type: 'password'}} label="Password"/>
        <BasicInput inputProps={{id:'employee-re-password', type: 'password'}} label="Re-Password"/>
        <div className="b-button p-font clickable employee-form-modal__button" onClick={handleEmployeeForm}>{data.employeeId ? 'Edit' : 'Create'}</div>
      </div>
    </div>
  )
};

export default EmployeeFormModal;