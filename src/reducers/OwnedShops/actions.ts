import { FETCH_ICECREAM_SHOPS_SUCCESS, FETCH_ICECREAM_SHOPS_FAIL, FETCH_ICECREAM_SHOPS_START } from './action-types';
export const fetchIcecreamShopsSuccess = (icecreamShops: any) => ({type: FETCH_ICECREAM_SHOPS_SUCCESS, payload: icecreamShops});
export const fetchIcecreamShopsFail = () => ({type: FETCH_ICECREAM_SHOPS_FAIL});
export const fetchIcecreamShopsStart = () => ({type: FETCH_ICECREAM_SHOPS_START});