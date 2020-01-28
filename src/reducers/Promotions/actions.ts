import { FETCH_PROMOTIONS_SUCCESS, FETCH_PROMOTIONS_FAIL, FETCH_PROMOTIONS_START } from './action-types';
export const fetchPromotionsSuccess = (promotions: any) => ({type: FETCH_PROMOTIONS_SUCCESS, payload: promotions});
export const fetchPromotionsFail = () => ({type: FETCH_PROMOTIONS_FAIL});
export const fetchPromotionsStart = () => ({type: FETCH_PROMOTIONS_START});