import { generateUrl } from './../../components/common/UploadImage/index';
import { fetchIcecreamShopsStart, fetchIcecreamShopsSuccess } from './actions';
import { dataProvider } from '../../utils/requestBuilder';
import userType from '../../enums/userType';
export const fetchOwnedShops = (uType: number, userId: number) => (dispatch: Function, getState: Function) => {
  dispatch(fetchIcecreamShopsStart());
  let data;
  if (userType.manager === uType) {
    data = {managerId: userId};
  }
  if (userType.employee === uType) {
    data = {employeeId: userId};
  }
  dataProvider().post('icecream-shops/list', {offset: 0, limit: 999, ...data})
    .then((response) => {
      dispatch(fetchIcecreamShopsSuccess(response.data.result.map((ics: any) => ({
        id: ics.icecream_shop_id,
        name: ics.name,
        logoUrl: generateUrl(ics.logo_file_name),
        address: `${ics.street}, ${ics.postal_code} ${ics.city}`,
        flavours: [],
        follows: Number(ics.follows),
      }))));
    })
    .catch((error) => {
      console.error(error);
    })
};
