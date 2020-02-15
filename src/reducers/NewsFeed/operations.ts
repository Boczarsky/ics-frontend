import { generateUrl } from './../../components/common/UploadImage/index';
import { fetchNewsFeedStart, fetchNewsFeedSuccess } from './actions';
import { dataProvider } from '../../utils/requestBuilder';
import { pushNotification } from '../Notifications/operations';

export const fetchNewsFeed = () => (dispatch: Function, getState: Function) => {
  dispatch(fetchNewsFeedStart());
  dataProvider().post('posts/newsFeed', {offset: 0, limit: 20})
    .then((response) => {
      const news = response.data.result.map((post: any) => ({
        icecreamShopData: {
          id: post.icecream_shop_id,
          logoUrl: generateUrl(post.logo_file_name),
          name: post.name,
          address: `${post.street}, ${post.city} ${post.postal_code}`,
        },
        postData: {
          id: post.post_id,
          imageUrl: generateUrl(post.file_name),
          title: post.title,
          content: post.content,
          reactions: post.reactions,
        }
      }));
      dispatch(fetchNewsFeedSuccess(news));
    })
    .catch(() => {
      dispatch(pushNotification('Error during loading data', 'error', 2000));
    });
};
