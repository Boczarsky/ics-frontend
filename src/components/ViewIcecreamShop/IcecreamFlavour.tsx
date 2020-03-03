import React from 'react';
import './style.css';
import { ReactComponent as EditIcon } from '../../icons/edit.svg';
import { ReactComponent as BlockIcon } from '../../icons/block.svg';
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg';
import { ReactComponent as EyeOffIcon } from '../../icons/eye-off.svg';
import { ReactComponent as EyeOnIcon } from '../../icons/eye-on.svg';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../reducers/Modals/actions';
import { useRouteMatch } from 'react-router-dom';
import { fetchShop } from '../../reducers/ViewShop/operations';
import { dataProvider } from '../../utils/requestBuilder';
import { pushNotification } from '../../reducers/Notifications/operations';
import { generateUrl } from '../common/UploadImage';

export interface IcecreamFlavourProps {
  flavourData: {
    id: number;
    name: string,
    reactions: Object[],
    composition: string;
    tags: string[];
    fileName: string;
    status: number;
  };
  specialOptions: boolean;
}

const IcecreamFlavour = (props: IcecreamFlavourProps) => {
  const { flavourData, specialOptions } = props;
  const dispatch = useDispatch();
  const match = useRouteMatch<any>();
  const icecreamShopId = Number(match.params.id);
  const uId = useSelector((state: any) => state.auth.userId);
  const openEditModal = () => {
    dispatch(openModal('flavourForm', {...flavourData, icecreamShopId}));
  };
  const handleChangeStatus = (status: number) => {
    const requestData = {
      icecreamShopId: icecreamShopId,
      flavourId: flavourData.id,
      status,
    };
    dataProvider().post('flavours/edit', requestData)
      .then(() => {
        dispatch(fetchShop(icecreamShopId));
      })
      .catch(() => {
        dispatch(pushNotification('Error changing status', 'error', 2000));
      })
  }
  const handleRemove = () => {
    const requestData = {
      icecreamShopId: icecreamShopId,
      flavourId: flavourData.id,
    };
    dataProvider().post('flavours/remove', requestData)
      .then(() => {
        dispatch(fetchShop(icecreamShopId));
      })
      .catch(() => {
        dispatch(pushNotification('Error during delete', 'error', 2000));
      })
  };
  const handleAddReaction = (reaction: number) => () => {
    dataProvider().post('flavours/reactions/add', {flavourId: flavourData.id, reactionType: reaction}).then(() => {
      dispatch(fetchShop(icecreamShopId));
    })
  };
  const handleRemoveReaction = () => {
    dataProvider().post('flavours/reactions/remove', {flavourId: flavourData.id}).then(() => {
      dispatch(fetchShop(icecreamShopId));
    })
  };
  const {reactions, selected} = flavourData.reactions.reduce((acc: any, current: any) => {
    if (current.reaction_type === 3) {
      acc.reactions[0] += 1
    } else if (current.reaction_type === 2) {
      acc.reactions[1] += 1
    } else if (current.reaction_type === 1) {
      acc.reactions[2] += 1
    }
    if (uId === current.user_id) {
      acc.selected = current.reaction_type;
    }
    return acc;
  }, {reactions: [0,0,0], selected: null})
  return (
    <div className="icecream-flavour">
      <div className="icecream-flavour__header">
        <div className="icecream-flavour__name">{flavourData.name}</div>
        <div className="icecream-flavour__reactions">
          <div className={`clickable icecream-flavour__reaction ${selected === 3 ? 'selected' : ''}`} onClick={selected !== 3 ? handleAddReaction(3) : handleRemoveReaction}>
            <span className="icecream-flavour__reaction-count">{reactions[0] || '0'}</span>
            <span className="icecream-flavour__reaction-type" role="img" aria-label="love">😍</span>
          </div>
          <div className={`clickable icecream-flavour__reaction ${selected === 2 ? 'selected' : ''}`} onClick={selected !== 2 ? handleAddReaction(2) : handleRemoveReaction}>
          <span className="icecream-flavour__reaction-count">{reactions[1] || '0'}</span>
            <span className="icecream-flavour__reaction-type" role="img" aria-label="meh">🥱</span>
          </div>
          <div className={`clickable icecream-flavour__reaction ${selected === 1 ? 'selected' : ''}`} onClick={selected !== 1 ? handleAddReaction(1) : handleRemoveReaction}>
            <span className="icecream-flavour__reaction-count">{reactions[2] || '0'}</span>
            <span className="icecream-flavour__reaction-type" role="img" aria-label="hate">😒</span>
          </div>
        </div>
      </div>
      <div className="icecream-flavour__image-wrapper">
        {flavourData.fileName ?
          <img src={generateUrl(flavourData.fileName)} alt="icecream overview"/> :
          <div className="icecream-flavour__image-placeholder"/>
        }
      </div>
      <div className={`icecream-flavour__composition ${[2,3].includes(flavourData.status) ? 'out-of-stock' : ''}`}>
        {flavourData.composition}
      </div>
      <div className="icecream-flavour__tags">
        {flavourData.tags.map(tag => <div key={tag} className="pill icecream-flavour__tag" >#{tag}</div>)}
      </div>
      {specialOptions && <div className="icecream-flavour__extra-options">
        <div className="icecream-flavour__toggle-hide icecream-flavour__extra-option" onClick={() => flavourData.status === 3 ? handleChangeStatus(1) : handleChangeStatus(3)}>{flavourData.status === 3 ? <EyeOffIcon/> : <EyeOnIcon/>}</div>
        <div className={`icecream-flavour__toggle-out-of-stock icecream-flavour__extra-option ${flavourData.status === 2 ? 'out-of-stock' : ''}`} onClick={() => flavourData.status === 2 ? handleChangeStatus(1) : handleChangeStatus(2)}><BlockIcon/></div>
        <div className="icecream-flavour__edit icecream-flavour__extra-option" onClick={openEditModal}><EditIcon/></div>
        <div className="icecream-flavour__delete icecream-flavour__extra-option" onClick={handleRemove}><DeleteIcon/></div>
      </div>}
    </div>
  )
};

export default IcecreamFlavour;
