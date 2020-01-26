import React, { useEffect } from 'react';
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

const ViewIcecreamShop = () => {
  const id = useSelector((state: any) => state.viewShop.data.id);
  const logoUrl = useSelector((state: any) => state.viewShop.data.logoUrl);
  const backgroundUrl = useSelector((state: any) => state.viewShop.data.backgroundUrl);
  const description = useSelector((state: any) => state.viewShop.data.description);
  const street = useSelector((state: any) => state.viewShop.data.street);
  const city = useSelector((state: any) => state.viewShop.data.city);
  const postalCode = useSelector((state: any) => state.viewShop.data.postalCode);
  const googleMapLink = useSelector((state: any) => state.viewShop.data.googleMapLink);
  const openDays = useSelector((state: any) => state.viewShop.data.openDays);
  const specialDays = useSelector((state: any) => state.viewShop.data.specialDays);
  const opinions = useSelector((state: any) => state.viewShop.data.opinions);
  const posts = useSelector((state: any) => state.viewShop.data.posts);
  const flavours = useSelector((state: any) => state.viewShop.data.flavours)
  const history = useHistory();
  const match = useRouteMatch<any>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (match.params.id) {
      dispatch(fetchShop(match.params.id))
    }
  }, [match.params.id, dispatch])

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
          <div className="b-button p-font clickable">Add to favorite</div>
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
            opinions={opinions || []}
          />
        </LabeledSection>
        <LabeledSection label="Posts">
          <ShopPosts
            posts={posts || []}
            icecreamShopId={id}
          />
        </LabeledSection>
      </div>
    </AppLayout>
  )
};

export default ViewIcecreamShop;
