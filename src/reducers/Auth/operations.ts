import { setUserData } from './actions';
export const login = (loginData: any) => (dispatch: Function, getState: Function) => {
  const { username, password } = loginData;
  dispatch(setUserData({
    loggedIn: true,
    login: username,
    userType: -1,
    firstName: '',
    lastName: '',
    logoUrl: '',
  }));
};
