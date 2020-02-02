import React, { useState, useEffect } from 'react';
import './style.css';
import randomKey from '../../../utils/randomKey';
import { ReactComponent as UploadIcon } from '../../../icons/upload.svg';
import { REST_URL } from '../../../utils/env';
import { dataProvider } from '../../../utils/requestBuilder';
import { useDispatch } from 'react-redux';
import { pushNotification } from '../../../reducers/Notifications/operations';

export interface UploadImageProps {
  className?: string;
  initialUrl?: string;
  onFileUploaded: (imageUrl: string) => any;
}

export const generateUrl = (fileName: string) => {
  const session = localStorage.getItem('access_token');
  if (!fileName || !session) {
    return '';
  }
  return `${REST_URL}files/${session}/${fileName}`
};

const UploadImage = (props: UploadImageProps) => {
  const {className, initialUrl, onFileUploaded} = props; 
  const [imageUrl, setImageUrl] = useState(initialUrl || '');
  useEffect(() => {
    if (initialUrl && imageUrl !== initialUrl) {
      setImageUrl(initialUrl);
    }
  }, [initialUrl, imageUrl]);
  const dispatch = useDispatch();
  const handleFileUpload = (event: any) => {
    if (event.target.files[0]) {
      const data = new FormData();
      data.append('file', event.target.files[0]);
      dataProvider().post('files/upload', data)
        .then(response => {
          const { fileName } = response.data;
          onFileUploaded(fileName);
        })
        .catch(() => {
          dispatch(pushNotification('Error during file upload', 'error', 2000));
        });
    }
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