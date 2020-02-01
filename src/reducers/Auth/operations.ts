import { setUserData } from './actions';
import { authProvider } from '../../utils/requestBuilder';
import { pushNotification } from '../Notifications/operations';
export const login = (loginData: any) => (dispatch: Function, getState: Function) => {
  const { username, password } = loginData;
  authProvider.post('login', { username, password })
    .then(response => {
      const { user_type, first_name, last_name, email, login, avatar_file_name, user_id, manager_id, access_token } = response.data;
      localStorage.setItem('access_token', access_token);
      dispatch(setUserData({
        loggedIn: true,
        userId: user_id,
        managerId: manager_id,
        login,
        email,
        userType: user_type,
        firstName: first_name,
        lastName: last_name,
        avatarFileName: avatar_file_name,
      }));
    })
    .catch(error => dispatch(pushNotification('Wrong username or password', 'error', 2000)));
};
