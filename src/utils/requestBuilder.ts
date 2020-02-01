import axios from 'axios';
import { REST_URL } from './env';
export const authProvider = axios.create({
  baseURL: `${REST_URL}auth/`,
  timeout: 5000,
});
const getToken = () => {
  return localStorage.getItem('access_token');
}
export const dataProvider = () => axios.create({
  baseURL: REST_URL,
  timeout: 5000,
  headers: {Authorization: `Bearer ${getToken()}`}
});
