import { FETCH_ICECREAM_SHOP_SUCCESS, FETCH_ICECREAM_SHOP_FAIL, FETCH_ICECREAM_SHOP_START } from './action-types';
export const fetchIcecreamShopSuccess = (icecreamShopData: any) => ({type: FETCH_ICECREAM_SHOP_SUCCESS, payload: icecreamShopData});
export const fetchIcecreamShopFail = () => ({type: FETCH_ICECREAM_SHOP_FAIL});
export const fetchIcecreamShopStart = () => ({type: FETCH_ICECREAM_SHOP_START});