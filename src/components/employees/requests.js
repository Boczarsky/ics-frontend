import axios from 'axios';
import { API_URL } from '../../config/env';

export async function fetchEmployees() {
  try {
    const response = await axios.post(
      `${API_URL}employees/list`, { offset: 0, limit: 100 },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    );
    return { result: response.data.result, total: response.data.total, success: true };
  } catch (error) {
    return { result: [], success: false };
  }
}

export async function createEmployee(data) {
  try {
    const response = await axios.post(
      `${API_URL}employees/create`, data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function assignEmployee(data) {
  try {
    const response = await axios.post(
      `${API_URL}employees/assign`, data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function unassignEmployee(data) {
  try {
    const response = await axios.post(
      `${API_URL}employees/unassign`, data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return null;
  }
}
