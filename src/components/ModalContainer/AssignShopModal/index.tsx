import React, { MouseEvent, useState, useEffect } from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../reducers/Modals/actions';
import { pushNotification } from '../../../reducers/Notifications/operations';
import BasicSelect from '../../common/BasicSelect';
import randomKey from '../../../utils/randomKey';
import { dataProvider } from '../../../utils/requestBuilder';
import { fetchPromotions } from '../../../reducers/Promotions/operations';
import { useTranslation } from 'react-i18next';

export interface AssignShopModalProps {
  data: any;
}

const AssignShopModal = (props: AssignShopModalProps) => {
  const { data } = props;
  const [icecreamShops, setIcecreamShops] = useState<any>([]);
  useEffect(() => {
    dataProvider().get('promotions/shopsToAssign').then((response) => {
      const ics = response.data.map((icsData: any) => ({ value: icsData.icecream_shop_id, name: `${icsData.name} - ${icsData.city}, ${icsData.street}` }));
      setIcecreamShops([{value: null, name: ''}, ...ics]);
    })
  }, [])
  const [selectedShop, setSelectedShop] = useState(0);
  const [shopsAssigned, setShopsAssigned] = useState<any>(data.assignedShops);
  const filteredOptions = icecreamShops.filter((option: any) => !shopsAssigned.includes(option.value));
  const dispatch = useDispatch();
  const closeModalWindow = (event: MouseEvent<HTMLDivElement>) => {
    const target: any = event.target;
    if (target.classList.contains('modal-overlay')) {
      dispatch(closeModal('assignShop'));
    }
  }
  const handleAssignShop = () => {
    const shop = icecreamShops.find((option: any) => +option.value === +selectedShop);
    if (shop && shop.name) {
      dataProvider().post('promotions/assignShop', {promotionId: data.promotionId, icecreamShopId: Number(selectedShop)})
        .then(() => {
          setSelectedShop(0);
          setShopsAssigned([...shopsAssigned, shop.value]);
          dispatch(pushNotification('Shop assigned', 'normal', 2000));
          dispatch(fetchPromotions());
        })
        .catch(() => {
          dispatch(pushNotification('Error during assignment', 'error', 2000));
        });
    }
  }
  const handleUnassignShop = (shopId: number) => () => {
    dataProvider().post('promotions/unassignShop', {promotionId: data.promotionId, icecreamShopId: Number(shopId)})
        .then(() => {
          setShopsAssigned(shopsAssigned.filter((assignedShopId: any) => assignedShopId !== shopId));
          dispatch(pushNotification('Shop unassigned', 'normal', 2000));
          dispatch(fetchPromotions());
        })
        .catch(() => {
          dispatch(pushNotification('Error during unassignment', 'error', 2000));
        });
  }
  const { t } = useTranslation();
  return (
    <div className="modal-overlay" onMouseDown={closeModalWindow}>
      <div className="modal-wrapper assign-shop-modal">
        {shopsAssigned.map((shopId: any) => {
          const shop = icecreamShops.find((option: any) => +option.value === +shopId);
          if (shop && shop.name) {
            return <div key={randomKey()} className="assign-shop-modal__assigned-shop">
              <div>{shop.name}</div>
              <div className="clickable p-font b-button b-button--red assign-shop-modal__unassign-button" onClick={handleUnassignShop(shopId)}>{t('Unassign')}</div>
            </div>
          }
          return undefined;
        })}
        <div className="assign-shop-modal__assign">
          <BasicSelect selectProps={{id: 'assign-shop-select', value: selectedShop}} handleChange={setSelectedShop} options={filteredOptions} nameKey="name" valueKey="value"/>
          <div className="clickable p-font b-button assign-shop-modal__assign-button" onClick={handleAssignShop}>{t('Assign')}</div>
        </div>
      </div>
    </div>
  )
};

export default AssignShopModal;
