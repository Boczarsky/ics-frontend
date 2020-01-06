import { fetchIcecreamShopsStart, fetchIcecreamShopsSuccess, setIcecreamShopsFilter } from './actions';
export const fetchIcecreamShops = () => (dispatch: Function, getState: Function) => {
  dispatch(fetchIcecreamShopsStart());
  // TODO: CONNECT WITH API
  dispatch(fetchIcecreamShopsSuccess([]));
};
export const searchIcecreamShops = (callback: Function, filters: {tags: string[], city: string}) => (dispatch: Function, getState: Function) => {
  dispatch(setIcecreamShopsFilter(filters));
  callback();
}
