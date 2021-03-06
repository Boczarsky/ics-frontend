import { FETCH_ICECREAM_SHOPS_SUCCESS, FETCH_ICECREAM_SHOPS_FAIL, FETCH_ICECREAM_SHOPS_START } from './action-types';
export interface FavoriteShopsState {
  list: any[];
  loading: Boolean;
  error: Object;
}

const initialState: FavoriteShopsState = {
  list: [],
  loading: false,
  error: {},
};

export const favoriteShops = (state: FavoriteShopsState = initialState, action: any) => {
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