import axios from 'axios';
import { API_URL } from '../../config/env';

export async function fetchCoupons() {
  try {
    const response = await axios.get(
      `${API_URL}promotions/coupon/list`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    );
    return { result: response.data, total: response.data.total, success: true };
  } catch (error) {
    return { result: [], success: false };
  }
}

export async function fetchPromotions() {
  try {
    const response = await axios.get(
      `${API_URL}promotions/list`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    );
    return { result: response.data, total: response.data.total, success: true };
  } catch (error) {
    return { result: [], success: false };
  }
}

export async function listPromotions(filters) {
  try {
    const response = await axios.post(
      `${API_URL}promotions/view`, filters,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function createPromotion(data) {
  try {
    const response = await axios.post(
      `${API_URL}promotions/create`, data,
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

export async function removePromotion(data) {
  try {
    const response = await axios.post(
      `${API_URL}promotions/remove`, data,
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

export async function couponReward(data) {
  try {
    const response = await axios.post(
      `${API_URL}promotions/coupon/reward`, data,
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

export async function couponRedeem(data) {
  try {
    const response = await axios.post(
      `${API_URL}promotions/coupon/reedem`, data,
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

export async function couponCreate(data) {
  try {
    const response = await axios.post(
      `${API_URL}promotions/coupon/create`, data,
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
