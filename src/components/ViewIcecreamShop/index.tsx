import React, { useEffect, useState } from 'react';
import AppLayout from '../common/AppLayout';
import './style.css';
import LabeledSection from '../common/LabeledSection';
import ShopInfo from './ShopInfo';
import ShopFlavours from './ShopFlavours';
import ShopOpinions from './ShopOpinions';
import ShopPosts from './ShopPosts';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { fetchShop } from '../../reducers/ViewShop/operations';
import { useSelector, useDispatch } from 'react-redux';
import { generateUrl } from '../common/UploadImage';
import userType from '../../enums/userType';
import { dataProvider } from '../../utils/requestBuilder';
import { pushNotification } from '../../reducers/Notifications/operations';

const ViewIcecreamShop = () => {
  const logoUrl = useSelector((state: any) => generateUrl(state.viewShop.data.logoFileName));
  const backgroundUrl = useSelector((state: any) => generateUrl(state.viewShop.data.backgroundFileName));
  const description = useSelector((state: any) => state.viewShop.data.description);
  const street = useSelector((state: any) => state.viewShop.data.street);
  const city = useSelector((state: any) => state.viewShop.data.city);
  const postalCode = useSelector((state: any) => state.viewShop.data.postalCode);
  const googleMapLink = useSelector((state: any) => state.viewShop.data.googleMapLink);
  const openDays = useSelector((state: any) => state.viewShop.data.openDays);
  const specialDays = useSelector((state: any) => state.viewShop.data.specialDays);
  const flavours = useSelector((state: any) => state.viewShop.data.flavours);
  const uType = useSelector((state: any) => state.auth.userType);
  const isFollowing = useSelector((state: any) => state.viewShop.data.following);
  const followers = useSelector((state: any) => state.viewShop.data.followers);
  const rated = useSelector((state: any) => state.viewShop.data.rated);
  const history = useHistory();
  const match = useRouteMatch<any>();
  const dispatch = useDispatch();
  const id = Number(match.params.id);
  const [isFavorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFollowing);
  }, [isFollowing]);

  useEffect(() => {
    if (match.params.id) {
      dispatch(fetchShop(match.params.id))
    }
  }, [match.params.id, dispatch]);

  const handleAddToFavorite = () => {
    dataProvider().post('icecream-shops/addToFavorite', { icecreamShopId: id })
    .then(() => {
      setFavorite(true);
    })
    .catch(() => {
      dispatch(pushNotification('Adding to favorite failed', 'error', 2000));
    })
  };

  const handleRemoveFromFavorite = () => {
    dataProvider().post('icecream-shops/removeFromFavorite', { icecreamShopId: id })
    .then(() => {
      setFavorite(false);
    })
    .catch(() => {
      dispatch(pushNotification('Removing from favorite failed', 'error', 2000));
    })
  };

  return (
    <AppLayout
      handleBackClick={() => history.goBack()}
      topbarContent={<div className="page-title">{'Cool Icecream Shop'}</div>}
    >
      <div className="view-icecream-shop">
        <div className="view-icecream-shop__header-images">
          <div className="view-icecream-shop__background">
            {backgroundUrl ? <img src={backgroundUrl} alt="background"/> : <div className="view-icecream-shop__image-placeholder"/>}
          </div>
          <div className="view-icecream-shop__logo">
            {logoUrl ? <img src={logoUrl} alt="logo"/> : <div className="view-icecream-shop__image-placeholder"/>}
          </div>
        </div>
        <div className="view-icecream-shop__favorite">
          {uType === userType.client && (
            <div
              className="b-button p-font clickable"
              onClick={isFavorite ? handleRemoveFromFavorite : handleAddToFavorite}
            >
              {isFavorite ? 'Remove from favorite' : 'Add to favorite'}
            </div>
          )}
        </div>
        <div className="view-icecream-shop__favorite-counter">
          <span role="img" aria-label="favorite">💛</span><span>{followers || '0'}</span>
        </div>
        <div className="view-icecream-shop__description-wrapper">
          <div className="view-icecream-shop__description">{description}</div>
        </div>
        <LabeledSection label="Flavours">
          <ShopFlavours
            flavours={flavours || []}
            icecreamShopId={id}
          />
        </LabeledSection>
        <LabeledSection label="Shop info">
          <ShopInfo
            street={street}
            city={city}
            postalCode={postalCode}
            googleMapLink={googleMapLink}
            openDays={openDays || []}
            specialDays={specialDays || []}
          />
        </LabeledSection>
        <LabeledSection label="Opinions">
          <ShopOpinions
            icecreamShopId={id}
            rated={rated}
          />
        </LabeledSection>
        <LabeledSection label="Posts">
          <ShopPosts
            icecreamShopId={id}
          />
        </LabeledSection>
      </div>
    </AppLayout>
  )
};

export default ViewIcecreamShop;
