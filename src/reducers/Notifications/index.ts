import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from './action-types';
export interface NotificationsState {
  list: {id: string, message: string, type: string, time: string}[];
}

const initialState: NotificationsState = {
  list: [],
};

export const notifications = (state: NotificationsState = initialState, action: any) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {list: [...state.list, action.payload]};
    case REMOVE_NOTIFICATION:
      return {list: state.list.filter(notification => notification.id !== action.payload)};
    default:
      return state;
  }
}