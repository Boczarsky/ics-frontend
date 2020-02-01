import { SET_USER_DATA, CLEAR_USER_DATA } from './action-types';
export interface AuthState {
  loggedIn: boolean;
  userId: number;
  managerId: number;
  userType: number;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarFileName: string;
}

const initialState: AuthState = {
  loggedIn: false,
  userId: -1,
  managerId: -1,
  userType: -1,
  login: '',
  firstName: '',
  lastName: '',
  email: '',
  avatarFileName: '',
};

function checkInLocalStorage(initialState: any) {
  const localState = localStorage.getItem('userData');
  if (localState) {
    return JSON.parse(localState);
  }
  return initialState;
}

export const auth = (state: AuthState = checkInLocalStorage(initialState), action: any) => {
  switch (action.type) {
    case SET_USER_DATA:
      const newState = {...state, ...action.payload};
      localStorage.setItem('userData', JSON.stringify(newState));
      return newState;
    case CLEAR_USER_DATA:
      localStorage.removeItem('userData');
      return {
        loggedIn: false,
        userId: -1,
        managerId: -1,
        userType: -1,
        login: '',
        firstName: '',
        lastName: '',
        email: '',
        avatarFileName: '',
      };
    default:
      return state;
  }
};