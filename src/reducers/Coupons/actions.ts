import { FETCH_COUPONS_SUCCESS, FETCH_COUPONS_FAIL, FETCH_COUPONS_START } from './action-types';
export const fetchCouponsSuccess = (coupons: any) => ({type: FETCH_COUPONS_SUCCESS, payload: coupons});
export const fetchCouponsFail = () => ({type: FETCH_COUPONS_FAIL});
export const fetchCouponsStart = () => ({type: FETCH_COUPONS_START});