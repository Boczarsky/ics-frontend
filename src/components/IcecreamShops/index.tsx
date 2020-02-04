import React, { useEffect } from 'react';
import AppLayout from '../common/AppLayout';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ShopOverview from '../common/ShopOverview';
import { fetchFavoriteShops } from '../../reducers/FavoriteShops/operations';
import { fetchOwnedShops } from '../../reducers/OwnedShops/operations';
import userType from '../../enums/userType';

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

  return (
    <AppLayout
      topbarContent={
        <div className="page-title">Icecream shops</div>
      }
    >
      <div className="icecream-shops">
        {userType.client === uType && <div className="icecream-shops__favorite-list">
          {favorites.map((favoriteShop: any) => <ShopOverview key={`favorite-${favoriteShop.id}`} data={favoriteShop} handleClick={handleBrowseClick}/>)}
        </div>}
        <div className="icecream-shops__owned-list">
          {[userType.manager, userType.employee].includes(uType) && <>
          {userType.manager === uType && <Link className="icecream-shops__create" to="/icecream-shops/create"><div className="b-button clickable">Create icecream shop</div></Link>}
          {owned.map((ownedShop: any) => <div className="icecream-shops__overview-wrapper">
            <ShopOverview key={`owned-${ownedShop.id}`} data={ownedShop} handleClick={handleBrowseClick}/>
            {userType.manager === uType && <div className="b-button clickable icecream-shops__edit-button" onClick={() => handleEditClick(ownedShop)}>Edit</div>}
          </div>)}
          </>}
        </div>
      </div>
    </AppLayout>
  )
}

export default IcecreamShops
