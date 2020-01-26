import { fetchIcecreamShopsStart, fetchIcecreamShopsSuccess } from './actions';
export const fetchFavoriteShops = () => (dispatch: Function, getState: Function) => {
  dispatch(fetchIcecreamShopsStart());
  const icecreamShops = [
    {
      id: 1,
      name: 'Cool Icecream Shop',
      logoUrl: '',
      address: 'Króla Jankiela II 16/1, 44-100 Gliwice',
      flavours: [],
      follows: 1519
    },
    {
      id: 2,
      name: 'Cooler Icecream Shop',
      logoUrl: '',
      address: 'Króla Jankiela II 16/2, 44-100 Gliwice',
      flavours: [],
      follows: 5161
    }
  ];
  dispatch(fetchIcecreamShopsSuccess(icecreamShops));
};
