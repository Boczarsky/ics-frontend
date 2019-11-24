import axios from 'axios';
import { API_URL } from '../../../config/env';

export async function fetchIcecreamShops(filters) {
  try {
    const response = await axios.post(
      `${API_URL}icecream-shops/list`, filters,
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

export async function createNewShop(data) {
  try {
    const response = await axios.post(
      `${API_URL}icecream-shops/create`, data,
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

export async function uploadFile(formData) {
  try {
    const response = await axios.post(
      `${API_URL}files/upload`, formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    return '';
  }
}
