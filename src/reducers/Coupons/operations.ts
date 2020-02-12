import { generateUrl } from './../../components/common/UploadImage/index';
import { fetchCouponsStart, fetchCouponsSuccess, fetchCouponsFail } from './actions';
import { dataProvider } from '../../utils/requestBuilder';
export const fetchCoupons = () => (dispatch: Function, getState: Function) => {
  dispatch(fetchCouponsStart());
  dataProvider().get('promotions/coupon/list')
    .then((response) => {
      const coupons = response.data.map((couponData: any) => ({
        icecreamShopData: {
          logoUrl: generateUrl(couponData.icecream_shop.logo_file_name),
          name: couponData.icecream_shop.name,
          address: `${couponData.icecream_shop.street}, ${couponData.icecream_shop.city} ${couponData.icecream_shop.postal_code}`
        },
        couponData: {
          id: couponData.coupon.id,
          prize: couponData.coupon.prize,
          info: couponData.coupon.info,
          limit: couponData.coupon.limit,
          count: couponData.coupon.count,
          startDate: couponData.coupon.start_date,
          endDate: couponData.coupon.end_date,
        }
      }));
      dispatch(fetchCouponsSuccess(coupons));
    })
    .catch(() => dispatch(fetchCouponsFail()));
};
