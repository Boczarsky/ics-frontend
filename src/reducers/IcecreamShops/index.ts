import { FETCH_ICECREAM_SHOPS_SUCCESS, FETCH_ICECREAM_SHOPS_FAIL, FETCH_ICECREAM_SHOPS_START, SET_ICECREAM_SHOPS_FILTER } from './action-types';
export interface IcecreamShopsState {
  list: any[];
  filters: Object;
  loading: Boolean;
  error: Object;
}

const initialState: IcecreamShopsState = {
  list: [],
  filters: localStorage.getItem('searchIcecreamShopFilters') ? JSON.parse(localStorage.getItem('searchIcecreamShopFilters')!) : {
    city: '',
    tags: [],
    offset: 0,
    limit: 20,
  },
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
    case SET_ICECREAM_SHOPS_FILTER:
      const filters = {...state.filters, ...action.payload};
      localStorage.setItem('searchIcecreamShopFilters', JSON.stringify(filters));
      return {...state, filters};
    default:
      return state
  }
}