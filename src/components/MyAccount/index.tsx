import React, { useReducer, useEffect } from 'react';
import AppLayout from '../common/AppLayout';
import './style.css';
import UploadImage, { generateUrl } from '../common/UploadImage';
import BasicInput from '../common/BasicInput';
import { reducer, initialState, setValue } from './formReducer';
import { dataProvider } from '../../utils/requestBuilder';
import { useDispatch } from 'react-redux';
import { pushNotification } from '../../reducers/Notifications/operations';
import { setUserData } from '../../reducers/Auth/actions';

const MyAccount = () => {
  const [state, localDispatch] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const fetchMyUser = () => {
    dataProvider().get('users/my')
      .then((response) => {
        const { avatar_file_name, first_name, last_name } = response.data;
        localDispatch(setValue('avatarFileName', avatar_file_name || ''));
        localDispatch(setValue('firstName', first_name || ''));
        localDispatch(setValue('lastName', last_name || ''));
      })
      .catch(() => {
        dispatch(pushNotification('Error during fetching user data', 'error', 2000));
      })
  };
  const editMyUser = (data: any) => {
    dataProvider().post('users/my', data)
      .then((response) => {
        const { avatar_file_name, first_name, last_name, user_id, manager_id, login, email, user_type } = response.data;
        localDispatch(setValue('avatarFileName', avatar_file_name || ''));
        localDispatch(setValue('firstName', first_name || ''));
        localDispatch(setValue('lastName', last_name || ''));
        dispatch(pushNotification('Saved', 'error', 2000));
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
      .catch(() => {
        dispatch(pushNotification('Error during editing user', 'error', 2000));
      });
  };
  useEffect(() => {
    fetchMyUser();
  }, []);
  const handleSave = () => {
    editMyUser({firstName: state.firstName.value, lastName: state.lastName.value});
  };
  const handleChangePassword = () => {
    editMyUser({password: state.newPassword.value, oldPassword: state.oldPassword.value});
  };
  return (
    <AppLayout
      topbarContent={
        <div className="page-title">
          My account
        </div>
      }
    >
      <div className="my-account">
        <div className="my-account__left-wrapper">
          <UploadImage key="upload-avatar" className="my-account__avatar" initialUrl={generateUrl(state.avatarFileName.value)} onFileUploaded={fileName => editMyUser({avatar: fileName})}/>
        </div>
        <div className="my-account__right-wrapper">
          <div className="my-account__personal-info">
            <BasicInput
              inputProps={{id: 'userFirstName', value: state.firstName.value}}
              handleChange={value => localDispatch(setValue('firstName', value))}
              validationError={state.firstName.error}
              label="First name"
            />
            <BasicInput
              inputProps={{id: 'userLastName', value: state.lastName.value}}
              handleChange={value => localDispatch(setValue('lastName', value))}
              validationError={state.lastName.error}
              label="Last name"
            />
            <div className={`b-button clickable ${state.formValid ? '' : 'disabled'}`} onClick={state.formValid ? handleSave : undefined}>Save</div>
          </div>
          <div className="my-account__password-change">
            <BasicInput
              inputProps={{id: 'userOldPassword', value: state.oldPassword.value, type: 'password'}}
              handleChange={value => localDispatch(setValue('oldPassword', value))}
              validationError={state.oldPassword.error}
              label="Old password"
            />
            <BasicInput
              inputProps={{id: 'userNewPassword', value: state.newPassword.value, type: 'password'}}
              handleChange={value => localDispatch(setValue('newPassword', value))}
              validationError={state.newPassword.error}
              label="New password"
            />
            <div className={`b-button clickable ${state.passValid ? '' : 'disabled'}`} onClick={state.formValid ? handleChangePassword : undefined}>Change password</div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default MyAccount
