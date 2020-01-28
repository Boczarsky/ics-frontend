import { FETCH_COUPONS_SUCCESS, FETCH_COUPONS_FAIL, FETCH_COUPONS_START } from './action-types';
export interface CouponsState {
  list: any[];
  loading: Boolean;
  error: Object;
}

const initialState: CouponsState = {
  list: [],
  loading: false,
  error: {},
};

export const coupons = (state: CouponsState = initialState, action: any) => {
  switch (action.type) {
    case FETCH_COUPONS_START:
      return {...state, loading: true, error: {}}
    case FETCH_COUPONS_SUCCESS:
      return {...state, list: action.payload, loading: false};
    case FETCH_COUPONS_FAIL:
      return {...state, list: [], loading: false, error: action.payload};
    default:
      return state
  }
}