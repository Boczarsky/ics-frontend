import React, { FormEvent, useReducer } from 'react';
import './style.css';
import BasicInput from '../common/BasicInput';
import { reducer, initialState, setValue, clearForm } from './formReducer';
import { Link, useHistory } from 'react-router-dom';
import BasicToggle from '../common/BasicToggle';
import { authProvider } from '../../utils/requestBuilder';
import userType from '../../enums/userType';
import { useDispatch } from 'react-redux';
import { pushNotification } from '../../reducers/Notifications/operations';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const [state, localDispatch] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      firstName: state.firstName.value,
      lastName: state.lastName.value,
      login: state.username.value,
      email: state.email.value,
      password: state.password.value,
      userType: state.isCompany.value ? userType.manager : userType.client,
    }
    authProvider.post('register', data)
      .then(response => {
        dispatch(pushNotification('Account created successfuly', 'normal', 2000));
        history.push('/login');
      })
      .catch(error => {
        if (error.response && error.response.data.message === 'LoginExist') {
          dispatch(pushNotification('Login is already used by someone', 'error', 2000));
        } else if (error.response && error.response.data.message === 'EmailExist') {
          dispatch(pushNotification('Email is already used by someone', 'error', 2000));
        } else {
          dispatch(pushNotification('Account register failed', 'error', 2000));
        }
      });
  }
  const { t } = useTranslation();
  return (
    <div className="register">
      <form onSubmit={handleFormSubmit} className="register__form card">
        <div className="register__toggle-wrapper">
          <div className="register__toggle-label">{t('Client')}</div>
          <BasicToggle
            value={state?.isCompany.value}
            handleToggle={(value) => localDispatch(setValue('isCompany', value))}
          />
          <div className="register__toggle-label">{t('Company')}</div>
        </div>
        <BasicInput
          inputProps={{name: 'username', id: 'username', type: 'text', value: state?.username.value}}
          handleChange={(value) => localDispatch(setValue('username', value))}
          validationError={state?.username.error}
          label="Username"
        />
        <BasicInput
          inputProps={{name: 'email', id: 'email', type: 'email', value: state?.email.value}}
          handleChange={(value) => localDispatch(setValue('email', value))}
          validationError={state?.email.error}
          label="Email"
        />
        <BasicInput
          inputProps={{name: 'password', id: 'password', type: 'password', value: state?.password.value}}
          handleChange={(value) => localDispatch(setValue('password', value))}
          validationError={state?.password.error}
          label="Password"
        />
        <BasicInput
          inputProps={{name: 'rePassword', id: 're-password', type: 'password', value: state?.rePassword.value}}
          handleChange={(value) => localDispatch(setValue('rePassword', value))}
          validationError={state?.rePassword.error}
          label="Re-password"
        />
        <BasicInput
          inputProps={{name: 'firstName', id: 'firstName', type: 'text', value: state?.firstName.value}}
          handleChange={(value) => localDispatch(setValue('firstName', value))}
          validationError={state?.firstName.error}
          label="First name"
        />
        <BasicInput
          inputProps={{name: 'lastName', id: 'lastName', type: 'text', value: state?.lastName.value}}
          handleChange={(value) => localDispatch(setValue('lastName', value))}
          validationError={state?.lastName.error}
          label="Last name"
        />
        <button className="b-button register__submit" disabled={!state?.formValid}>{t('Register')}</button>
      </form>
      <Link to="/login"><div className="register__login-redirect">{t('You already have an account?')}</div></Link>
    </div>
  )
};

export default Register;
