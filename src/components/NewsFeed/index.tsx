import React, { useEffect } from 'react';
import AppLayout from '../common/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsFeed } from '../../reducers/NewsFeed/operations';
import ShopHeader from '../common/ShopOverview/ShopHeader';
import ShopPost from '../common/ShopPost';
import randomKey from '../../utils/randomKey';
import './style.css';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NewsFeed = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: any) => state.newsFeed.list);
  useEffect(() => {
    dispatch(fetchNewsFeed());
  }, [dispatch]);
  const history = useHistory();
  const handleRedirect = (id: any) => () => {
    history.push(`/browse/${id}`);
  }
  const { t } = useTranslation();
  return (
    <AppLayout
      topbarContent={
        <div className="page-title">{t('News feed')}</div>
      }
    >
      <div className="news-feed">
        {posts.map((post: any) => (
          <div className="news-feed__news" key={randomKey()}>
            <div onClick={handleRedirect(post.icecreamShopData.id)}>
              <ShopHeader
                headerData={post.icecreamShopData}
              />
            </div>
            <ShopPost
              post={post.postData}
            />
          </div>
        ))}
      </div>
    </AppLayout>
  )
}

export default NewsFeed
