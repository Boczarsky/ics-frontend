import React from 'react';
import AppLayout from '../common/AppLayout';
import UploadLogo from './UploadLogo';

const CreateIcecreamShop = () => {
  return (
    <AppLayout
      returnPath="/icecream-shops"
      topbarContent={
        <div className="page-title">Create icecream shop</div>
      }
    >
      <div className="create-icecream-shop">
        <UploadLogo/>
      </div>
    </AppLayout>
  )
};

export default CreateIcecreamShop;
