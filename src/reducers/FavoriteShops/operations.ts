import { generateUrl } from './../../components/common/UploadImage/index';
import { fetchIcecreamShopsStart, fetchIcecreamShopsSuccess, fetchIcecreamShopsFail } from './actions';
import { dataProvider } from '../../utils/requestBuilder';
export const fetchFavoriteShops = () => (dispatch: Function, getState: Function) => {
  dispatch(fetchIcecreamShopsStart());
  dataProvider().post('icecream-shops/list/favorite', {limit: 999, offset: 0}).then(response => {
    const shops = response.data.result.map((ics: any) => ({
      id: ics.id,
      name: ics.name,
      logoUrl: generateUrl(ics.logo_file_name),
      address: `${ics.street}, ${ics.postal_code} ${ics.city}`,
      flavours: [],
      follows: Number(ics.follows),
    }));
    dispatch(fetchIcecreamShopsSuccess(shops));
  })
  .catch((error) => {
    console.error(error);
    dispatch(fetchIcecreamShopsFail());
  })
};
