import { fetchIcecreamShopStart, fetchIcecreamShopSuccess } from './actions';
import { dataProvider } from '../../utils/requestBuilder';
import { pushNotification } from '../Notifications/operations';
export const fetchShop = (id: number) => (dispatch: Function, getState: Function) => {
  dispatch(fetchIcecreamShopStart());
  dataProvider().get(`icecream-shops/${id}`)
        .then(response => {
          const { name, city, street, postal_code, description, logo_file_name, background_file_name, google_map_link, open_days, special_days, opinions, posts, flavours } = response.data;
          const data = {
            name,
            city,
            street,
            postalCode: postal_code,
            description,
            logoFileName: logo_file_name,
            backgroundFileName: background_file_name,
            googleMapLink: google_map_link,
            openDays: open_days.map((oDay: any) => ({from: oDay.from, to: oDay.to, hourFrom: oDay.hour_from, hourTo: oDay.hour_to})),
            specialDays: special_days.map((sDay: any) => ({closed: sDay.closed, from: sDay.from, to: sDay.to, hourFrom: sDay.hour_from, hourTo: sDay.hour_to})),
            opinions,
            posts,
            flavours: flavours.map((flavour: any) => (
              {
                id: flavour.icecream_flavour_id,
                name: flavour.name,
                composition: flavour.composition,
                status: flavour.status,
                reactions: flavour.reactions,
                tags: flavour.hashtags.map((tag: any) => tag.hashtag)
              }
            ))
          };
          dispatch(fetchIcecreamShopSuccess(data));
        })
        .catch(() => {
          dispatch(pushNotification('Error during loading data', 'error', 2000));
        });
};
