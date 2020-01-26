import React, { useEffect } from 'react';
import AppLayout from '../common/AppLayout';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ShopOverview from '../common/ShopOverview';
import { fetchFavoriteShops } from '../../reducers/FavoriteShops/operations';
import { fetchOwnedShops } from '../../reducers/OwnedShops/operations';

const IcecreamShops = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFavoriteShops());
    dispatch(fetchOwnedShops());
  }, [dispatch])

  const favorites = useSelector((state:any) => state.favoriteShops.list);
  const owned = useSelector((state:any) => state.ownedShops.list);
  
  const history = useHistory();
  const handleOwnedClick = (data: any) => {
    history.push(`/icecream-shops/edit/${data.id}`);
  };
  const handleFavoriteClick = (data: any) => {
    history.push(`/browse/${data.id}`);
  };

  return (
    <AppLayout
      topbarContent={
        <div className="page-title">Icecream shops</div>
      }
    >
      <div className="icecream-shops">
        <div className="icecream-shops__owned-list">
          {favorites.map((favoriteShop: any) => <ShopOverview key={`favorite-${favoriteShop.id}`} data={favoriteShop} handleClick={handleFavoriteClick}/>)}
        </div>
        <div className="icecream-shops__favorite-list">
          <Link className="icecream-shops__create" to="/icecream-shops/create"><div className="b-button clickable">Create icecream shop</div></Link>
          {owned.map((ownedShop: any) => <ShopOverview key={`owned-${ownedShop.id}`} data={ownedShop} handleClick={handleOwnedClick}/>)}
        </div>
      </div>
    </AppLayout>
  )
}

export default IcecreamShops
