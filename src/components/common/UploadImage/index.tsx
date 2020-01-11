import React, { useState } from 'react';
import './style.css';
import randomKey from '../../../utils/randomKey';
import { ReactComponent as UploadIcon } from '../../../icons/upload.svg';

export interface UploadImageProps {
  className?: string;
  initialUrl?: string;
  onFileUploaded: (imageUrl: string) => any;
}

const UploadImage = (props: UploadImageProps) => {
  const {className, initialUrl, onFileUploaded} = props; 
  const [imageUrl, setImageUrl] = useState(initialUrl || '');
  const handleFileUpload = (event: any) => {
    let url = ''
    if (event.target.files[0]) {
      url = URL.createObjectURL(event.target.files[0]);
    }
    setImageUrl(url);
    onFileUploaded(url);
  };
  const uploadImageButtonId = randomKey();
  const getMobileClass = () => {
    return window.orientation !== undefined ? 'mobile-preview' : ''
  }
  return (
    <div className={`upload-image ${className}`}>
      <div className={`upload-image__preview ${getMobileClass()}`}>
        {imageUrl ? <img src={imageUrl} alt="preview"/> : <div className="upload-image__placeholder"/>}
      </div>
      <label htmlFor={uploadImageButtonId} className="clickable upload-image__upload-button">
          <UploadIcon className="upload-image__upload-icon"/>
        <input accept="image/jpeg, image/png" name="upload-image-button" id={uploadImageButtonId} type="file" className="upload-image__hidden-input" onChange={handleFileUpload}/>
      </label>
    </div>
  )
};

export default UploadImage;