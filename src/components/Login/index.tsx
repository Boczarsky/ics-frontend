import React, { FormEvent } from 'react'
import BasicInput from '../common/BasicInput';
import './style.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const {username, password} = form;
    console.log(username.value, password.value);
  }

  return (
    <div className="login">
      <form onSubmit={handleFormSubmit} className="login__form card">
        <BasicInput inputProps={{name: 'username', id: 'username', type: 'text'}} label="Username"/>
        <BasicInput inputProps={{name: 'password', id: 'password', type: 'password'}} label="Password"/>
        <button className="b-button login__submit">Login</button>
      </form>
      <Link to="/register"><div className="login__register-redirect">You don't have account yet?</div></Link>
    </div>
  )
};

export default Login;
