import React, { FormEvent, useEffect } from 'react'
import BasicInput from '../common/BasicInput';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../reducers/Auth/operations';

const Login = () => {
  const isLoggedIn = useSelector((state: any) => state.auth.loggedIn);
  const history = useHistory();
  useEffect(() => {
    if (isLoggedIn) {
      history.push('/')
    }
  }, [isLoggedIn, history])
  const dispatch = useDispatch();
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const {username, password} = form;
    dispatch(login({ username: username.value, password: password.value }))
    username.value = '';
    password.value = '';
  }

  return (
    <div className="login">
      <form onSubmit={handleFormSubmit} className="login__form card">
        <BasicInput inputProps={{name: 'username', id: 'username', type: 'text', required: true}} label="Username"/>
        <BasicInput inputProps={{name: 'password', id: 'password', type: 'password', required: true}} label="Password"/>
        <button className="b-button login__submit clickable">Login</button>
      </form>
      <Link to="/register"><div className="login__register-redirect">You don't have account yet?</div></Link>
    </div>
  )
};

export default Login;
