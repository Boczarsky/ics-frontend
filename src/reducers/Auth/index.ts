import { SET_USER_DATA, CLEAR_USER_DATA } from './action-types';
export interface AuthState {
  loggedIn: boolean;
  login: string;
  userType: number;
  firstName: string;
  lastName: string;
  logoUrl: string;
}

const initialState: AuthState = {
  loggedIn: false,
  login: '',
  userType: -1,
  firstName: '',
  lastName: '',
  logoUrl: '',
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
        login: '',
        userType: -1,
        firstName: '',
        lastName: '',
        logoUrl: '',
      };
    default:
      return state;
  }
};