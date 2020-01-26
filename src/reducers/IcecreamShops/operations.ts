import { fetchIcecreamShopsStart, fetchIcecreamShopsSuccess, setIcecreamShopsFilter } from './actions';
export const fetchIcecreamShops = () => (dispatch: Function, getState: Function) => {
  dispatch(fetchIcecreamShopsStart());
  const icecreamShops = [
    {
      id: 1,
      name: 'Cool Icecream Shop',
      logoUrl: '',
      address: 'Króla Jankiela II 16/1, 44-100 Gliwice',
      flavours: [
        {name: 'Truskawkowe', reactions: [156,15,2]},
        {name: 'Malinowe', reactions: [50,12,1]},
        {name: 'Śmietankowe', reactions: [106,12,2]},
      ],
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
export const searchIcecreamShops = (callback: Function, filters: {tags: string[], city: string}) => (dispatch: Function, getState: Function) => {
  dispatch(setIcecreamShopsFilter(filters));
  callback();
}
