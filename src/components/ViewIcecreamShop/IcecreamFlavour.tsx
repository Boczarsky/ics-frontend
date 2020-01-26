import React from 'react';
import './style.css';
import { ReactComponent as EditIcon } from '../../icons/edit.svg';
import { ReactComponent as BlockIcon } from '../../icons/block.svg';
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg';
import { ReactComponent as EyeOffIcon } from '../../icons/eye-off.svg';
import { ReactComponent as EyeOnIcon } from '../../icons/eye-on.svg';
import { useDispatch } from 'react-redux';
import { openModal } from '../../reducers/Modals/actions';

export interface IcecreamFlavourProps {
  flavourData: {
    id: number;
    name: string,
    reactions: number[],
    composition: string;
    tags: string[];
    status: number;
  };
  specialOptions: boolean;
}

const IcecreamFlavour = (props: IcecreamFlavourProps) => {
  const { flavourData, specialOptions } = props;
  const dispatch = useDispatch();
  const openEditModal = () => {
    dispatch(openModal('flavourForm', flavourData));
  };
  return (
    <div className="icecream-flavour">
      <div className="icecream-flavour__header">
        <div className="icecream-flavour__name">{flavourData.name}</div>
        <div className="icecream-flavour__reactions">
          <div className="clickable icecream-flavour__reaction">
            <span className="icecream-flavour__reaction-count">{flavourData.reactions[0] || '0'}</span>
            <span className="icecream-flavour__reaction-type" role="img" aria-label="love">😍</span>
          </div>
          <div className="clickable icecream-flavour__reaction">
          <span className="icecream-flavour__reaction-count">{flavourData.reactions[1] || '0'}</span>
            <span className="icecream-flavour__reaction-type" role="img" aria-label="meh">🥱</span>
          </div>
          <div className="clickable icecream-flavour__reaction">
            <span className="icecream-flavour__reaction-count">{flavourData.reactions[2] || '0'}</span>
            <span className="icecream-flavour__reaction-type" role="img" aria-label="hate">😒</span>
          </div>
        </div>
      </div>
      <div className="icecream-flavour__composition">
        {flavourData.composition}
      </div>
      <div className="icecream-flavour__tags">
        {flavourData.tags.map(tag => <div key={tag} className="pill icecream-flavour__tag" >#{tag}</div>)}
      </div>
      {specialOptions && <div className="icecream-flavour__extra-options">
        <div className="icecream-flavour__toggle-hide icecream-flavour__extra-option">{flavourData.status === 3 ? <EyeOffIcon/> : <EyeOnIcon/>}</div>
        <div className={`icecream-flavour__toggle-out-of-stock icecream-flavour__extra-option ${flavourData.status === 2 ? 'out-of-stock' : ''}`}><BlockIcon/></div>
        <div className="icecream-flavour__edit icecream-flavour__extra-option" onClick={openEditModal}><EditIcon/></div>
        <div className="icecream-flavour__delete icecream-flavour__extra-option"><DeleteIcon/></div>
      </div>}
    </div>
  )
};

export default IcecreamFlavour;
