import React, { MouseEvent, useState } from 'react';
import BasicInput from '../../common/BasicInput';
import './style.css';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../reducers/Modals/actions';
import { pushNotification } from '../../../reducers/Notifications/operations';
import UploadImage from '../../common/UploadImage';

export interface PostFormModalProps {
  data: any;
};

const PostFormModal = (props: PostFormModalProps) => {
  const { data } = props;
  const dispatch = useDispatch();
  const closeModalWindow = (event: MouseEvent<HTMLDivElement>) => {
    const target: any = event.target;
    if (target.classList.contains('modal-overlay')) {
      dispatch(closeModal('postForm'));
    }
  }
  const [imageUrl, setImageUrl] = useState(data.imageUrl || '');
  const [title, setTitle] = useState(data.title || '');
  const [content, setContent] = useState(data.content || '');
  const handlePostForm = () => {
    dispatch(closeModal('postForm'));
    console.log(imageUrl, title, content);
    dispatch(pushNotification('Post added', 'normal', 2000));
  }
  return (
    <div className="modal-overlay" onClick={closeModalWindow}>
      <div className="modal-wrapper post-form-modal">
        <UploadImage className="post-form-modal__upload-image" initialUrl={imageUrl} onFileUploaded={setImageUrl}/>
        <BasicInput inputProps={{id:'post-title', value: title}} label="Title" handleChange={setTitle}/>
        <BasicInput inputProps={{id:'post-content', value: content, rows: 10}} label="Content" textarea handleChange={setContent}/>
        <div className="b-button p-font clickable post-form-modal__button" onClick={handlePostForm}>{data.id ? 'Edit post' : 'Add post'}</div>
      </div>
    </div>
  )
};

export default PostFormModal;
