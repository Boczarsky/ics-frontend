import React, { MouseEvent, useState, useReducer, useEffect } from 'react';
import BasicInput from '../../common/BasicInput';
import './style.css';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../reducers/Modals/actions';
import { pushNotification } from '../../../reducers/Notifications/operations';
import UploadImage from '../../common/UploadImage';
import { reducer, initialState, setValue, setInitial } from './formReducer';

export interface PostFormModalProps {
  data: any;
};

const PostFormModal = (props: PostFormModalProps) => {
  const { data } = props;
  const [state, formDispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    formDispatch(setInitial(data));
  }, [data]);
  const dispatch = useDispatch();
  const closeModalWindow = (event: MouseEvent<HTMLDivElement>) => {
    const target: any = event.target;
    if (target.classList.contains('modal-overlay')) {
      dispatch(closeModal('postForm'));
    }
  }
  const handlePostForm = () => {
    dispatch(closeModal('postForm'));
    dispatch(pushNotification('Post added', 'normal', 2000));
  }
  return (
    <div className="modal-overlay" onClick={closeModalWindow}>
      <div className="modal-wrapper post-form-modal">
        <UploadImage className="post-form-modal__upload-image" initialUrl={state.imageUrl.value} onFileUploaded={value => formDispatch(setValue('imageUrl', value))}/>
        <BasicInput inputProps={{id:'post-title', value: state.title.value}} label="Title" handleChange={value => formDispatch(setValue('title', value))}/>
        <BasicInput inputProps={{id:'post-content', value: state.content.value, rows: 10}} label="Content" textarea handleChange={value => formDispatch(setValue('content', value))}/>
        <div className="b-button p-font clickable post-form-modal__button" onClick={handlePostForm}>{data.id ? 'Edit post' : 'Add post'}</div>
      </div>
    </div>
  )
};

export default PostFormModal;
