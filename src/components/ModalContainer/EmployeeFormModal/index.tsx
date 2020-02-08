import React, { MouseEvent, useReducer, useEffect } from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../reducers/Modals/actions';
import { pushNotification } from '../../../reducers/Notifications/operations';
import BasicInput from '../../common/BasicInput';
import { reducer, initialState, setValue, setInitial } from './formReducer';
import { dataProvider } from '../../../utils/requestBuilder';
import { fetchEmployees } from '../../../reducers/Employees/operations';

export interface EmployeeFormModalProps {
  data: any;
}

const EmployeeFormModal = (props: EmployeeFormModalProps) => {
  const { data } = props;
  const [state, formDispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (typeof data === 'object') {
      formDispatch(setInitial(data));
    }
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
    if (state.formValid) {
      const requestData = {
        login: state.login.value,
        email: state.email.value,
        password: state.password.value,
        firstName: state.firstName.value,
        lastName: state.lastName.value,
      }
      if (isEdit) {
        let editRequestData: any = { userId: data.id, firstName: requestData.firstName, lastName: requestData.lastName };
        if (requestData.password) {
          editRequestData = {...editRequestData, password: requestData.password };
        }
        dataProvider().post('employees/edit', editRequestData)
          .then((response: any) => {
            dispatch(fetchEmployees());
            dispatch(pushNotification('Employee edited successfuly', 'normal', 2000));
            dispatch(closeModal('employeeForm'));
          })
          .catch((error: any) => {
            dispatch(pushNotification('Employee edit failed', 'error', 2000));
          });
      } else {
        dataProvider().post('employees/create', requestData)
          .then((response: any) => {
            dispatch(fetchEmployees());
            dispatch(pushNotification('Employee created successfuly', 'normal', 2000));
            dispatch(closeModal('employeeForm'));
          })
          .catch((error: any) => {
            dispatch(pushNotification('Employee create failed', 'error', 2000));
          });
      }
    }
  }
  return (
    <div className="modal-overlay" onMouseDown={closeModalWindow}>
      <div className="modal-wrapper employee-form-modal">
        {!isEdit && <>
          <BasicInput inputProps={{id:'employee-login', value: state.login.value}} label="Username" handleChange={value => formDispatch(setValue('login', value))} validationError={state.login.error}/>
          <BasicInput inputProps={{id:'employee-email', type: 'email', value: state.email.value}} label="Email" handleChange={value => formDispatch(setValue('email', value))} validationError={state.email.error}/>
        </>}
        <BasicInput inputProps={{id:'employee-first-name', value: state.firstName.value}} label="First name" handleChange={value => formDispatch(setValue('firstName', value))} validationError={state.firstName.error}/>
        <BasicInput inputProps={{id:'employee-last-name', value: state.lastName.value}} label="Last name" handleChange={value => formDispatch(setValue('lastName', value))} validationError={state.lastName.error}/>
        <BasicInput inputProps={{id:'employee-password', type: 'password', value: state.password.value}} label="Password" handleChange={value => formDispatch(setValue('password', value))} validationError={state.password.error}/>
        <BasicInput inputProps={{id:'employee-re-password', type: 'password', value: state.rePassword.value}} label="Re-Password" handleChange={value => formDispatch(setValue('rePassword', value))} validationError={state.rePassword.error}/>
        <div className={`b-button p-font clickable employee-form-modal__button ${state.formValid ? '' : 'disabled'}`} onClick={handleEmployeeForm}>{isEdit ? 'Edit' : 'Create'}</div>
      </div>
    </div>
  )
};

export default EmployeeFormModal;