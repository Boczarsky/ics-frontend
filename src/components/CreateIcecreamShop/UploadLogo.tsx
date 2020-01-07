import React, { useState } from 'react';
import './style.css';

const UploadLogo = () => {
  const [logoUrl, setLogoUrl] = useState('');
  const handleFileUpload = (event: any) => {
    if (event.target.files[0]) {
      setLogoUrl(URL.createObjectURL(event.target.files[0]));
    } else {
      setLogoUrl('');
    }
  };
  return (
    <div className="upload-logo">
      <div className="upload-logo__preview">
        {logoUrl && <img src={logoUrl} alt="logo preview"/>}
      </div>
      <label htmlFor="logo-upload-button" className="b-button clickable upload-logo__upload-button">
        Upload
        <input name="logo-upload-button" id="logo-upload-button" type="file" className="upload-logo__hidden-input" onChange={handleFileUpload}/>
      </label>
    </div>
  )
};

export default UploadLogo;
