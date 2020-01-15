import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from './action-types';
export const addNotification = (id: string, message: string, type: string, time: number) => ({type: ADD_NOTIFICATION, payload: {id, message, type, time}});
export const removeNotification = (id: string) => ({type: REMOVE_NOTIFICATION, payload: id});