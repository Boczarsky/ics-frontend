import { FETCH_ICECREAM_SHOPS_SUCCESS, FETCH_ICECREAM_SHOPS_FAIL, FETCH_ICECREAM_SHOPS_START, SET_ICECREAM_SHOPS_FILTER } from './action-types';
export const fetchIcecreamShopsSuccess = (icecreamShops: any) => ({type: FETCH_ICECREAM_SHOPS_SUCCESS, payload: icecreamShops});
export const fetchIcecreamShopsFail = () => ({type: FETCH_ICECREAM_SHOPS_FAIL});
export const fetchIcecreamShopsStart = () => ({type: FETCH_ICECREAM_SHOPS_START});
export const setIcecreamShopsFilter = (filter: {city?: string, tags?: string[], limit?: number, offset?: number}) => (
  {type: SET_ICECREAM_SHOPS_FILTER, payload: filter}
);