import { fetchPromotionsStart, fetchPromotionsSuccess } from './actions';
export const fetchPromotions = () => (dispatch: Function, getState: Function) => {
  dispatch(fetchPromotionsStart());
  const promotions = [
    {id: 1, info: 'Every tenth icecream is free!', prize: 'Free icecream', limit: 9, startDate: '2019-12-01', endDate: '2019-12-01', icecreamShops: []},
    {id: 1, info: 'Every tenth icecream is free!', prize: 'Free icecream', limit: 9, startDate: '2019-12-01', endDate: '2019-12-01', icecreamShops: ['Cool Icecream Shop Name']},
    {id: 1, info: 'Every tenth icecream is free!', prize: 'Free icecream', limit: 9, startDate: '2019-12-01', endDate: '2019-12-01', icecreamShops: ['Cool Icecream Shop Name', 'Cool Icecream Shop Namee II', 'Cool Icecream Shop Name III']},
    {id: 1, info: 'Every tenth icecream is free!', prize: 'Free icecream', limit: 9, startDate: '2019-12-01', endDate: '2019-12-01', icecreamShops: ['Cool Icecream Shop Name', 'Cool Icecream Shop Namee II', 'Cool Icecream Shop Name III']},
    {id: 1, info: 'Every tenth icecream is free!', prize: 'Free icecream', limit: 9, startDate: '2019-12-01', endDate: '2019-12-01', icecreamShops: ['Cool Icecream Shop Name', 'Cool Icecream Shop Namee II', 'Cool Icecream Shop Name III']},
    {id: 1, info: 'Every tenth icecream is free!', prize: 'Free icecream', limit: 9, startDate: '2019-12-01', endDate: '2019-12-01', icecreamShops: ['Cool Icecream Shop Name', 'Cool Icecream Shop Namee II', 'Cool Icecream Shop Name III']},
  ];
  dispatch(fetchPromotionsSuccess(promotions));
};
