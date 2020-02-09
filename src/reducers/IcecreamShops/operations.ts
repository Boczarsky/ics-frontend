import { generateUrl } from './../../components/common/UploadImage/index';
import { fetchIcecreamShopsStart, fetchIcecreamShopsSuccess, setIcecreamShopsFilter, fetchIcecreamShopsFail } from './actions';
import { dataProvider } from '../../utils/requestBuilder';
export const fetchIcecreamShops = () => (dispatch: Function, getState: Function) => {
  const state = getState();
  const filters = state.icecreamShops.filters;
  dispatch(fetchIcecreamShopsStart());
  dataProvider().post('icecream-shops/list', {offset: filters.offset, limit: filters.limit, city: filters.city, hashtags: filters.tags})
    .then((response) => {
      dispatch(fetchIcecreamShopsSuccess(response.data.result.map((ics: any) => ({
        id: ics.icecream_shop_id,
        name: ics.name,
        logoUrl: generateUrl(ics.logo_file_name),
        address: `${ics.street}, ${ics.postal_code} ${ics.city}`,
        flavours: ics.flavours,
        follows: Number(ics.follows),
      }))));
    })
    .catch((error) => {
      console.error(error);
      dispatch(fetchIcecreamShopsFail());
    })
};
export const searchIcecreamShops = (callback: Function, filters: {tags: string[], city: string}) => (dispatch: Function, getState: Function) => {
  dispatch(setIcecreamShopsFilter(filters));
  callback();
}
