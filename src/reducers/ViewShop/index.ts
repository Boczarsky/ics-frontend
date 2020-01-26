import { FETCH_ICECREAM_SHOP_SUCCESS, FETCH_ICECREAM_SHOP_FAIL, FETCH_ICECREAM_SHOP_START } from './action-types';
export interface ViewShopState {
  data: any;
  loading: Boolean;
  error: Object;
}

const initialState: ViewShopState = {
  data: {},
  loading: false,
  error: {},
};

export const viewShop = (state: ViewShopState = initialState, action: any) => {
  switch (action.type) {
    case FETCH_ICECREAM_SHOP_START:
      return {...state, loading: true, error: {}}
    case FETCH_ICECREAM_SHOP_SUCCESS:
      return {...state, data: action.payload, loading: false};
    case FETCH_ICECREAM_SHOP_FAIL:
      return {...state, data: {}, loading: false, error: action.payload};
    default:
      return state
  }
}