import { fetchPromotionsStart, fetchPromotionsSuccess } from './actions';
import { dataProvider } from '../../utils/requestBuilder';
export const fetchPromotions = () => (dispatch: Function, getState: Function) => {
  dispatch(fetchPromotionsStart());
  dataProvider().get('promotions/list').then((response) => {
    const promotions = response.data.map((data: any) => ({
      id: data.promotion_id,
      info: data.info,
      prize: data.prize,
      limit: data.limit,
      startDate: data.start_date,
      endDate: data.end_date,
      icecreamShops: data.assigned_shops,
    }))
    dispatch(fetchPromotionsSuccess(promotions));
  })
};
