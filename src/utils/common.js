import { API_URL } from '../config/env';

export function composeSecureUrl(fileName) {
  const session = localStorage.getItem('access_token');
  return `${API_URL}files/${session}/${fileName}`;
}

export function some() {
  return true;
}
