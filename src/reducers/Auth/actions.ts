import { SET_USER_DATA, CLEAR_USER_DATA } from './action-types';
export const setUserData = (userData: any) => ({type: SET_USER_DATA, payload: userData});
export const clearUserData = () => ({type: CLEAR_USER_DATA});