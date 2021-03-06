import { OPEN_MODAL, CLOSE_MODAL } from './action-types';
export interface ModalsState {
  redeemCoupon: any;
  addPoints: any;
  createPromotion: any;
  employeeForm: any;
  assignEmployee: any;
  assignShop: any;
  flavourForm: any;
  postForm: any;
}

const initialState: ModalsState = {
  redeemCoupon: false,
  addPoints: false,
  createPromotion: false,
  employeeForm: false,
  assignEmployee: false,
  assignShop: false,
  flavourForm: false,
  postForm: false,
};

export const modals = (state: ModalsState = initialState, action: any) => {
  switch (action.type) {
    case OPEN_MODAL:
      const newState: any = {...state};
      Object.keys(newState).forEach((key: string) => newState[key] = false);
      newState[action.payload.modalName] = action.payload.modalData;
      return newState;
    case CLOSE_MODAL:
      return {...state, [action.payload]: false};
    default:
      return state
  }
}