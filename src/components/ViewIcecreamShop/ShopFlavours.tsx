import React from 'react';
import IcecreamFlavour from './IcecreamFlavour';
import randomKey from '../../utils/randomKey';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../reducers/Modals/actions';
import userType from '../../enums/userType';

export interface ShopFlavoursProps {
  flavours: any[];
  icecreamShopId: number;
}

const ShopFlavours = (props: ShopFlavoursProps) => {
  const uType = useSelector((state: any) => Number(state.auth.userType));
  const { flavours, icecreamShopId } = props;
  const dispatch = useDispatch();
  const openCreateModal = () => {
    dispatch(openModal('flavourForm', {icecreamShopId}));
  };
  return (
    <div className="shop-flavours">
      <div className="shop-flavours__wrapper">
        {flavours.map(flavour => <IcecreamFlavour key={randomKey()} flavourData={flavour} specialOptions={[userType.manager, userType.employee].includes(uType)}/>)}
      </div>
      <div className="b-button p-font clickable shop-flavours__add-button" onClick={openCreateModal}>Add flavour</div>
    </div>
  )
};

export default ShopFlavours;
