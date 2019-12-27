import { FETCH_ICECREAM_SHOPS_SUCCESS, FETCH_ICECREAM_SHOPS_FAIL, FETCH_ICECREAM_SHOPS_START } from './action-types';
export interface IcecreamShopsState {
  list: any[];
  filters: Object;
  loading: Boolean;
  error: Object;
}

const initialState: IcecreamShopsState = {
  list: [],
  filters: {},
  loading: false,
  error: {},
};

export const IcecreamShops = (state: IcecreamShopsState = initialState, action: any) => {
  switch (action.type) {
    case FETCH_ICECREAM_SHOPS_START:
      return {...state, loading: true, error: {}}
    case FETCH_ICECREAM_SHOPS_SUCCESS:
      return {...state, list: action.payload, loading: false};
    case FETCH_ICECREAM_SHOPS_FAIL:
      return {...state, list: [], loading: false, error: action.payload};
    default:
      return state
  }
}