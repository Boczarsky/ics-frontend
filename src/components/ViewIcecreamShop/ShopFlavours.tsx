import React from 'react';
import IcecreamFlavour from './IcecreamFlavour';
import randomKey from '../../utils/randomKey';
import { useDispatch } from 'react-redux';
import { openModal } from '../../reducers/Modals/actions';

export interface ShopFlavoursProps {
  flavours: any[];
  icecreamShopId: number;
}

const ShopFlavours = (props: ShopFlavoursProps) => {
  const { flavours, icecreamShopId } = props;
  const dispatch = useDispatch();
  const openCreateModal = () => {
    dispatch(openModal('flavourForm', {icecreamShopId}));
  };
  return (
    <div className="shop-flavours">
      <div className="shop-flavours__wrapper">
        {flavours.map(flavour => <IcecreamFlavour key={randomKey()} flavourData={flavour} specialOptions/>)}
      </div>
      <div className="b-button p-font clickable shop-flavours__add-button" onClick={openCreateModal}>Add flavour</div>
    </div>
  )
};

export default ShopFlavours;
