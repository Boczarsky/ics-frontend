import axios from 'axios';
import { API_URL } from '../config/env';

export function checkIfLoggedIn() {
  if (localStorage.getItem('access_token') !== null) {
    return true;
  }
  return false;
}

export function saveSessionToken(token) {
  localStorage.setItem('access_token', token);
}

export function saveUserType(userType) {
  localStorage.setItem('user_type', userType);
}

export function getUserType() {
  return +localStorage.getItem('user_type');
}

export async function login(username, password) {
  let response;
  try {
    response = await axios.post(`${API_URL}auth/login`, { username, password });
    saveSessionToken(response.data.access_token);
    saveUserType(response.data.user_type);
  } catch (error) {
    return { success: false, userType: null, error: error.response.data };
  }
  return { success: true, userType: response.data.user_type, error: null };
}

export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user_type');
}
