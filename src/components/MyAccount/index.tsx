import React, { useReducer } from 'react';
import AppLayout from '../common/AppLayout';
import './style.css';
import UploadImage from '../common/UploadImage';
import BasicInput from '../common/BasicInput';
import { reducer, initialState, setValue } from './formReducer';

const MyAccount = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
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
          <UploadImage key="upload-avatar" className="my-account__avatar" onFileUploaded={() => {}}/>
        </div>
        <div className="my-account__right-wrapper">
          <div className="my-account__personal-info">
            <BasicInput
              inputProps={{id: 'userFirstName', value: state.firstName.value}}
              handleChange={value => dispatch(setValue('firstName', value))}
              label="First name"
            />
            <BasicInput
              inputProps={{id: 'userLastName', value: state.lastName.value}}
              handleChange={value => dispatch(setValue('lastName', value))}
              label="Last name"
            />
            <div className="b-button clickable">Save</div>
          </div>
          <div className="my-account__password-change">
            <BasicInput
              inputProps={{id: 'userOldPassword', value: state.oldPassword.value, type: 'password'}}
              handleChange={value => dispatch(setValue('oldPassword', value))}
              label="Old password"
            />
            <BasicInput
              inputProps={{id: 'userNewPassword', value: state.newPassword.value, type: 'password'}}
              handleChange={value => dispatch(setValue('newPassword', value))}
              label="New password"
            />
            <div className="b-button clickable">Change password</div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default MyAccount
