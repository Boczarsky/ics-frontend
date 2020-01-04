import React, { FormEvent, useReducer } from 'react';
import './style.css';
import BasicInput from '../common/BasicInput';
import { reducer, initialState, setValue, clearForm } from './formReducer';
import { Link } from 'react-router-dom';
import BasicToggle from '../common/BasicToggle';

const Register = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // on success
    dispatch(clearForm());
  }
  
  return (
    <div className="register">
      <form onSubmit={handleFormSubmit} className="register__form card">
        <div className="register__toggle-wrapper">
          <div className="register__toggle-label">Client</div>
          <BasicToggle
            value={state?.isCompany.value}
            handleToggle={(value) => dispatch(setValue('isCompany', value))}
          />
          <div className="register__toggle-label">Company</div>
        </div>
        <BasicInput
          inputProps={{name: 'firstName', id: 'firstName', type: 'text', value: state?.firstName.value}}
          handleChange={(value) => dispatch(setValue('firstName', value))}
          validationError={state?.firstName.error}
          label="First Name"
        />
        <BasicInput
          inputProps={{name: 'lastName', id: 'lastName', type: 'text', value: state?.lastName.value}}
          handleChange={(value) => dispatch(setValue('lastName', value))}
          validationError={state?.lastName.error}
          label="Last Name"
        />
        <BasicInput
          inputProps={{name: 'username', id: 'username', type: 'text', value: state?.username.value}}
          handleChange={(value) => dispatch(setValue('username', value))}
          validationError={state?.username.error}
          label="Username"
        />
        <BasicInput
          inputProps={{name: 'email', id: 'email', type: 'email', value: state?.email.value}}
          handleChange={(value) => dispatch(setValue('email', value))}
          validationError={state?.email.error}
          label="Email"
        />
        <BasicInput
          inputProps={{name: 'password', id: 'password', type: 'password', value: state?.password.value}}
          handleChange={(value) => dispatch(setValue('password', value))}
          validationError={state?.password.error}
          label="Password"
        />
        <BasicInput
          inputProps={{name: 'rePassword', id: 're-password', type: 'password', value: state?.rePassword.value}}
          handleChange={(value) => dispatch(setValue('rePassword', value))}
          validationError={state?.rePassword.error}
          label="Re-password"
        />
        <button className="b-button register__submit" disabled={!state?.formValid}>Register</button>
      </form>
      <Link to="/login"><div className="register__login-redirect">You already have an account?</div></Link>
    </div>
  )
};

export default Register;
