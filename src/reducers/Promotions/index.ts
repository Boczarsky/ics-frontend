import { FETCH_PROMOTIONS_SUCCESS, FETCH_PROMOTIONS_FAIL, FETCH_PROMOTIONS_START } from './action-types';
export interface PromotionsState {
  list: any[];
  loading: Boolean;
  error: Object;
}

const initialState: PromotionsState = {
  list: [],
  loading: false,
  error: {},
};

export const promotions = (state: PromotionsState = initialState, action: any) => {
  switch (action.type) {
    case FETCH_PROMOTIONS_START:
      return {...state, loading: true, error: {}}
    case FETCH_PROMOTIONS_SUCCESS:
      return {...state, list: action.payload, loading: false};
    case FETCH_PROMOTIONS_FAIL:
      return {...state, list: [], loading: false, error: action.payload};
    default:
      return state
  }
}