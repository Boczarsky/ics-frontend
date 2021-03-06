import React, { useEffect } from 'react';
import AppLayout from '../common/AppLayout';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ShopOverview from '../common/ShopOverview';
import { fetchFavoriteShops } from '../../reducers/FavoriteShops/operations';
import { fetchOwnedShops } from '../../reducers/OwnedShops/operations';
import userType from '../../enums/userType';
import { dataProvider } from '../../utils/requestBuilder';
import { pushNotification } from '../../reducers/Notifications/operations';
import { useTranslation } from 'react-i18next';

const IcecreamShops = () => {
  const dispatch = useDispatch();

  const favorites = useSelector((state:any) => state.favoriteShops.list);
  const owned = useSelector((state:any) => state.ownedShops.list);
  const uType = useSelector((state: any) => Number(state.auth.userType));
  const uId = useSelector((state: any) => state.auth.userId);

  useEffect(() => {
    if (uType === userType.manager || uType === userType.employee) {
      dispatch(fetchOwnedShops(uType, uId));
    }
    if (uType === userType.client) {
      dispatch(fetchFavoriteShops());
    }
  }, [dispatch, uType, uId])
  
  const history = useHistory();
  const handleEditClick = (data: any) => {
    history.push(`/icecream-shops/edit/${data.id}`);
  };
  const handleBrowseClick = (data: any) => {
    history.push(`/browse/${data.id}`);
  };

  const handleDeleteClick = (data: any) => {
    dataProvider().post('icecream-shops/delete', {icecreamShopId: data.id})
    .then(() => {
      dispatch(fetchOwnedShops(uType, uId));
    })
    .catch(() => {
      dispatch(pushNotification('Error during removal', 'error', 2000));
    })
  }
  const { t } = useTranslation();
  return (
    <AppLayout
      topbarContent={
        <div className="page-title">{t('Icecream shops')}</div>
      }
    >
      <div className="icecream-shops">
        {userType.client === uType && <div className="icecream-shops__favorite-list">
          {favorites.map((favoriteShop: any) => <ShopOverview key={`favorite-${favoriteShop.id}`} data={favoriteShop} handleClick={handleBrowseClick}/>)}
        </div>}
        <div className="icecream-shops__owned-list">
          {[userType.manager, userType.employee].includes(uType) && <>
          {userType.manager === uType && <Link className="icecream-shops__create" to="/icecream-shops/create"><div className="b-button clickable">{t('Create icecream shop')}</div></Link>}
          {owned.map((ownedShop: any) => <div className="icecream-shops__overview-wrapper">
            <ShopOverview key={`owned-${ownedShop.id}`} data={ownedShop} handleClick={handleBrowseClick}/>
            {userType.manager === uType && <div className="b-button clickable icecream-shops__edit-button" onClick={() => handleEditClick(ownedShop)}>{t('Edit')}</div>}
            {userType.manager === uType && <div className="b-button clickable icecream-shops__delete-button" onClick={() => handleDeleteClick(ownedShop)}>{t('Remove')}</div>}
          </div>)}
          </>}
        </div>
      </div>
    </AppLayout>
  )
}

export default IcecreamShops
