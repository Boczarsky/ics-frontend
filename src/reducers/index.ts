import { newsFeed } from './NewsFeed/index';
import { coupons } from './Coupons/index';
import { promotions } from './Promotions/index';
import { employees } from './Employees/index';
import { combineReducers } from "redux";
import { notifications } from './Notifications/index';
import { modals } from './Modals/index';
import { icecreamShops } from "./IcecreamShops";
import { favoriteShops } from './FavoriteShops';
import { ownedShops } from './OwnedShops';
import { viewShop } from './ViewShop';

export default combineReducers({
  icecreamShops,
  modals,
  notifications,
  favoriteShops,
  ownedShops,
  viewShop,
  employees,
  promotions,
  coupons,
  newsFeed,
});