import React, { MouseEvent, useState } from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../reducers/Modals/actions';
import { pushNotification } from '../../../reducers/Notifications/operations';
import BasicSelect from '../../common/BasicSelect';
import randomKey from '../../../utils/randomKey';

export interface AssignShopModalProps {
  data: any;
}

const AssignShopModal = (props: AssignShopModalProps) => {
  const { data } = props;
  const icecreamShops = [
    {value: 0, name: ''},
    {value: 1, name: 'Cool Icecream Shop'},
    {value: 2, name: 'Cool Icecream Shop II'},
    {value: 3, name: 'Cool Icecream Shop III'}
  ];
  const [selectedShop, setSelectedShop] = useState(0);
  const [shopsAssigned, setShopsAssigned] = useState([1,2,3]);
  const filteredOptions = icecreamShops.filter(option => !shopsAssigned.includes(option.value));
  const dispatch = useDispatch();
  const closeModalWindow = (event: MouseEvent<HTMLDivElement>) => {
    const target: any = event.target;
    if (target.classList.contains('modal-overlay')) {
      dispatch(closeModal('assignShop'));
    }
  }
  const handleAssignShop = () => {
    const shop = icecreamShops.find(option => +option.value === +selectedShop);
    if (shop && shop.name) {
      setSelectedShop(0);
      setShopsAssigned([...shopsAssigned, shop.value]);
      dispatch(pushNotification('Shop assigned', 'normal', 2000));
    }
  }
  const handleUnassignShop = (shopId: number) => () => {
    setShopsAssigned(shopsAssigned.filter(assignedShopId => assignedShopId !== shopId));
    dispatch(pushNotification('Shop unassigned', 'normal', 2000));
  }
  return (
    <div className="modal-overlay" onMouseDown={closeModalWindow}>
      <div className="modal-wrapper assign-shop-modal">
        {shopsAssigned.map(shopId => {
          const shop = icecreamShops.find(option => +option.value === +shopId);
          if (shop && shop.name) {
            return <div key={randomKey()} className="assign-shop-modal__assigned-shop">
              <div>{shop.name}</div>
              <div className="clickable p-font b-button b-button--red assign-shop-modal__unassign-button" onClick={handleUnassignShop(shopId)}>Unassign</div>
            </div>
          }
          return undefined;
        })}
        <div className="assign-shop-modal__assign">
          <BasicSelect selectProps={{id: 'assign-shop-select', value: selectedShop}} handleChange={setSelectedShop} options={filteredOptions} nameKey="name" valueKey="value"/>
          <div className="clickable p-font b-button assign-shop-modal__assign-button" onClick={handleAssignShop}>Assign</div>
        </div>
      </div>
    </div>
  )
};

export default AssignShopModal;
