import { Notifications as notifications } from './Notifications/index';
import { Modals as modals } from './Modals/index';
import { combineReducers } from "redux";
import { IcecreamShops as icecreamShops } from "./IcecreamShops";

export default combineReducers({
  icecreamShops,
  modals,
  notifications
});