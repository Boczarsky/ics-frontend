import { OPEN_MODAL, CLOSE_MODAL } from './action-types';
export interface ModalsState {
  redeemCoupon: boolean;
  addPoints: boolean;
}

const initialState: ModalsState = {
  redeemCoupon: false,
  addPoints: false
};

export const Modals = (state: ModalsState = initialState, action: any) => {
  switch (action.type) {
    case OPEN_MODAL:
      const newState: any = {...state};
      Object.keys(newState).forEach((key: string) => newState[key] = false);
      newState[action.payload] = true;
      return newState;
    case CLOSE_MODAL:
      return {...state, [action.payload]: false};
    default:
      return state
  }
}