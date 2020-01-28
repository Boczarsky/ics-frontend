import { fetchCouponsStart, fetchCouponsSuccess } from './actions';
export const fetchCoupons = () => (dispatch: Function, getState: Function) => {
  dispatch(fetchCouponsStart());
  const coupons = [
    {
      icecreamShopData: {
        logoUrl: '',
        name: 'Cool Icecream Shop Name',
        address: 'Some St. 1105/15, City 14-510',
      },
      couponData: {
        id: 1,
        prize: 'Free Icecream',
        info: 'Every tenth icecream is free!',
        limit: 9,
        count: 1,
        startDate: '2020-01-18',
        endDate: '2020-03-18',
      }
    }
  ];;
  dispatch(fetchCouponsSuccess(coupons));
};
