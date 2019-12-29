import { fetchIcecreamShopsStart, fetchIcecreamShopsSuccess } from './actions';
export const fetchIcecreamShops = () => (dispatch: Function, getState: Function) => {
  dispatch(fetchIcecreamShopsStart());
  // TODO: CONNECT WITH API
  dispatch(fetchIcecreamShopsSuccess([]));
  console.log('pew pew');
};
