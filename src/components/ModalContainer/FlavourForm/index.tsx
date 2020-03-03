import React, { MouseEvent, useReducer, useEffect } from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../reducers/Modals/actions';
import { pushNotification } from '../../../reducers/Notifications/operations';
import BasicInput from '../../common/BasicInput';
import TagsInput from '../../common/TagsInput';
import { reducer, initialState, setValue, setInitial } from './formReducer';
import { dataProvider } from '../../../utils/requestBuilder';
import { fetchShop } from '../../../reducers/ViewShop/operations';
import { useTranslation } from 'react-i18next';
import UploadImage, { generateUrl } from '../../common/UploadImage';

export interface FlavourFormModalProps {
  data: any;
}

const FlavourFormModal = (props: FlavourFormModalProps) => {
  const { data } = props;
  const [state, formDispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    if (data.name) {
      formDispatch(setInitial(data));
    }
  }, [data])
  const dispatch = useDispatch();
  const closeModalWindow = (event: MouseEvent<HTMLDivElement>) => {
    const target: any = event.target;
    if (target.classList.contains('modal-overlay')) {
      dispatch(closeModal('flavourForm'));
    }
  }
  const handleFlavourForm = () => {
    if (data.id) {
      const requestData = {
        icecreamShopId: data.icecreamShopId,
        flavourId: data.id,
        name: state.name.value,
        fileName: state.fileName.value,
        composition: state.composition.value,
        hashtags: state.tags.value,
      }
      dataProvider().post('flavours/edit', requestData)
        .then(() => {
          dispatch(pushNotification('Flavour edited successfuly', 'normal', 2000));
          dispatch(closeModal('flavourForm'));
          dispatch(fetchShop(data.icecreamShopId));
        })
        .catch(() => {
          dispatch(pushNotification('Error during edit', 'error', 2000));
        })
    } else {
      const requestData = {
        icecreamShopId: data.icecreamShopId,
        name: state.name.value,
        composition: state.composition.value,
        status: 3,
        hashtags: state.tags.value,
      }
      dataProvider().post('flavours/add', requestData)
        .then(() => {
          dispatch(pushNotification('Flavour created successfuly', 'normal', 2000));
          dispatch(closeModal('flavourForm'));
          dispatch(fetchShop(data.icecreamShopId));
        })
        .catch(() => {
          dispatch(pushNotification('Error during create', 'error', 2000));
        })
    }
  }
  const { t } = useTranslation();
  return (
    <div className="modal-overlay" onMouseDown={closeModalWindow}>
      <div className="modal-wrapper flavour-form-modal">
        <UploadImage initialUrl={generateUrl(state.fileName.value)} onFileUploaded={value => formDispatch(setValue('fileName', value))} />
        <BasicInput inputProps={{id:'flavour-name', value: state.name.value}} handleChange={value => formDispatch(setValue('name', value))} label="Flavour name" validationError={state.name.error}/>
        <BasicInput inputProps={{id:'flavour-composition', rows: 5, value: state.composition.value}} handleChange={value => formDispatch(setValue('composition', value))} label="Composition" textarea validationError={state.composition.error}/>
        <TagsInput tags={state.tags.value} label="#Tags" handleChange={value => formDispatch(setValue('tags', value))}/>
        <div className={`b-button p-font clickable flavour-form-modal__button ${state.formValid ? '' : 'disabled'}`} onClick={state.formValid? handleFlavourForm : undefined}>{t(data.id ? 'Edit' : 'Create')}</div>
      </div>
    </div>
  )
};

export default FlavourFormModal;