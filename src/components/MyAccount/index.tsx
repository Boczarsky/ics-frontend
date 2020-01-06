import React from 'react';
import AppLayout from '../common/AppLayout';
import './style.css';

const MyAccount = () => {
  return (
    <AppLayout
      topbarContent={
        <div className="page-title">
          My account
        </div>
      }
    >
      <div className="my-account"></div>
    </AppLayout>
  )
}

export default MyAccount
