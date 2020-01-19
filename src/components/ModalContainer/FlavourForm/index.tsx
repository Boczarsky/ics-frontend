import React, { MouseEvent, useState } from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../reducers/Modals/actions';
import { pushNotification } from '../../../reducers/Notifications/operations';
import BasicInput from '../../common/BasicInput';
import TagsInput from '../../common/TagsInput';

export interface FlavourFormModalProps {
  data: any;
}

const FlavourFormModal = (props: FlavourFormModalProps) => {
  const { data } = props;
  const dispatch = useDispatch();
  const closeModalWindow = (event: MouseEvent<HTMLDivElement>) => {
    const target: any = event.target;
    if (target.classList.contains('modal-overlay')) {
      dispatch(closeModal('flavourForm'));
    }
  }
  const handleFlavourForm = () => {
    dispatch(closeModal('flavourForm'));
    if (data.flavourId) {
      dispatch(pushNotification('Flavour edited successfuly', 'normal', 2000));
    } else {
      dispatch(pushNotification('Flavour created successfuly', 'normal', 2000));
    }
  }
  const [tags, setTags] = useState<string[]>([]);
  return (
    <div className="modal-overlay" onClick={closeModalWindow}>
      <div className="modal-wrapper flavour-form-modal">
        <BasicInput inputProps={{id:'flavour-name'}} label="Flavour name"/>
        <BasicInput inputProps={{id:'flavour-composition', rows: 5}} label="Composition" textarea/>
        <TagsInput tags={tags} label="#Tags" handleChange={setTags}/>
        <div className="b-button p-font clickable flavour-form-modal__button" onClick={handleFlavourForm}>{data.flavourId ? 'Edit' : 'Create'}</div>
      </div>
    </div>
  )
};

export default FlavourFormModal;