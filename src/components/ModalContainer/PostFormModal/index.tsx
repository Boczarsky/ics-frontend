import React, { MouseEvent, useReducer, useEffect } from 'react';
import BasicInput from '../../common/BasicInput';
import './style.css';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../reducers/Modals/actions';
import { pushNotification } from '../../../reducers/Notifications/operations';
import UploadImage, { generateUrl } from '../../common/UploadImage';
import { reducer, initialState, setValue, setInitial } from './formReducer';
import { dataProvider } from '../../../utils/requestBuilder';
import { useTranslation } from 'react-i18next';

export interface PostFormModalProps {
  data: any;
};

const PostFormModal = (props: PostFormModalProps) => {
  const { data } = props;
  console.log(data);
  const [state, formDispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (!data.icecreamShopId)
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
    if (!data.icecreamShopId) {
      const createData = {
        postId: data.id,
        fileName: state.fileName.value,
        content: state.content.value,
        title: state.title.value,
      };
      dataProvider().post('posts/edit', createData).then(() => {
        dispatch(closeModal('postForm'));
        dispatch(pushNotification('Post edited', 'normal', 2000));
        data.fetchPosts();
      })
      .catch(() => {
        dispatch(pushNotification('Error during post edit', 'error', 2000));
      });
    } else {
      const createData = {
        icecreamShopId: data.icecreamShopId,
        fileName: state.fileName.value,
        content: state.content.value,
        title: state.title.value,
      };
      dataProvider().post('posts/create', createData).then(() => {
        dispatch(closeModal('postForm'));
        dispatch(pushNotification('Post added', 'normal', 2000));
        data.fetchPosts();
      })
      .catch(() => {
        dispatch(pushNotification('Error during post creation', 'error', 2000));
      });
    }
  }
  const { t } = useTranslation();
  return (
    <div className="modal-overlay" onMouseDown={closeModalWindow}>
      <div className="modal-wrapper post-form-modal">
        <UploadImage className="post-form-modal__upload-image" initialUrl={generateUrl(state.fileName.value)} onFileUploaded={value => formDispatch(setValue('fileName', value))}/>
        <BasicInput validationError={state.title.error} inputProps={{id:'post-title', value: state.title.value}} label="Title" handleChange={value => formDispatch(setValue('title', value))}/>
        <BasicInput validationError={state.content.error} inputProps={{id:'post-content', value: state.content.value, rows: 10}} label="Content" textarea handleChange={value => formDispatch(setValue('content', value))}/>
        <div className={`b-button p-font clickable post-form-modal__button ${state.formValid ? '' : 'disabled'}`} onClick={state.formValid ? handlePostForm : undefined}>{t(data.id ? 'Edit post' : 'Add post')}</div>
      </div>
    </div>
  )
};

export default PostFormModal;
