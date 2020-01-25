import React, { MouseEvent } from 'react';
import BasicInput from '../../common/BasicInput';
import './style.css';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../reducers/Modals/actions';
import { pushNotification } from '../../../reducers/Notifications/operations';

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
  const handlePostForm = () => {
    dispatch(closeModal('postForm'));
    dispatch(pushNotification('Post added', 'normal', 2000));
  }
  return (
    <div className="modal-overlay" onClick={closeModalWindow}>
      <div className="modal-wrapper post-form-modal">
        <BasicInput inputProps={{id:'post-title'}} label="Title"/>
        <div className="b-button p-font clickable post-form-modal__button" onClick={handlePostForm}>Add post</div>
      </div>
    </div>
  )
};

export default PostFormModal;
