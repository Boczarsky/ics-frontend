import React, { MouseEvent, useState, useEffect } from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../reducers/Modals/actions';
import { pushNotification } from '../../../reducers/Notifications/operations';
import BasicSelect from '../../common/BasicSelect';
import randomKey from '../../../utils/randomKey';
import { dataProvider } from '../../../utils/requestBuilder';
import { fetchEmployees } from '../../../reducers/Employees/operations';
import { useTranslation } from 'react-i18next';

export interface AssignEmployeeModalProps {
  data: any;
}

const AssignEmployeeModal = (props: AssignEmployeeModalProps) => {
  const { employee } = props.data;
  useEffect(() => {
    dataProvider().get('employees/shopsToAssign')
    .then(response => {
      const shops = response.data.map((shop: any) => ({value: shop.icecream_shop_id, name: shop.name}))
      setIcecreamShops(shops);
    })
    .catch(error => {
      setIcecreamShops([]);
    });
  }, [employee]);
  const [icecreamShops, setIcecreamShops] = useState<any>([]);
  const [selectedShop, setSelectedShop] = useState(0);
  const [shopsAssigned, setShopsAssigned] = useState(employee.shopsAssigned.map((shop: any) => shop.id));
  const filteredOptions = icecreamShops.filter((option: any) => !shopsAssigned.includes(option.value));
  const dispatch = useDispatch();
  const closeModalWindow = (event: MouseEvent<HTMLDivElement>) => {
    const target: any = event.target;
    if (target.classList.contains('modal-overlay')) {
      dispatch(closeModal('assignEmployee'));
    }
  }
  const handleAssignEmployee = () => {
    const shop = icecreamShops.find((option: any) => +option.value === +selectedShop);
    if (shop) {
      const requestData = { employeeId: employee.id, icecreamShopId: shop.value }
      dataProvider().post('employees/assign', requestData)
        .then((response: any) => {
          setSelectedShop(0);
          setShopsAssigned([...shopsAssigned, shop.value]);
          dispatch(pushNotification('Employee assigned', 'normal', 2000));
          dispatch(fetchEmployees());
        })
        .catch((error: any) => {
          setSelectedShop(0);
          dispatch(pushNotification('Error during assignment', 'error', 2000));
        });
    }
  }
  const handleUnassignEmployee = (shopId: number) => () => {
    const requestData = { employeeId: employee.id, icecreamShopId: shopId }
    dataProvider().post('employees/unassign', requestData)
      .then((request: any) => {
        setShopsAssigned(shopsAssigned.filter((assignedShopId: number) => assignedShopId !== shopId));
        dispatch(pushNotification('Employee unassigned', 'normal', 2000));
        dispatch(fetchEmployees());
      })
      .catch((error: any) => {
        dispatch(pushNotification('Error during unassignment', 'error', 2000));
      });
  }
  const { t } = useTranslation();
  return (
    <div className="modal-overlay" onMouseDown={closeModalWindow}>
      <div className="modal-wrapper assign-employee-modal">
        {Boolean(icecreamShops.length) && shopsAssigned.map((shopId: number) => {
          const shop = icecreamShops.find((option: any) => +option.value === +shopId);
          if (shop && shop.name) {
            return <div key={randomKey()} className="assign-employee-modal__assigned-shop">
              <div>{shop.name}</div>
              <div className="clickable p-font b-button b-button--red assign-employee-modal__unassign-button" onClick={handleUnassignEmployee(shopId)}>{t('Unassign')}</div>
            </div>
          }
          return undefined;
        })}
        <div className="assign-employee-modal__assign">
          <BasicSelect selectProps={{id: 'assign-employee-select', value: selectedShop}} handleChange={setSelectedShop} options={filteredOptions} nameKey="name" valueKey="value" emptyOption/>
          <div className="clickable p-font b-button assign-employee-modal__assign-button" onClick={handleAssignEmployee}>{t('Assign')}</div>
        </div>
      </div>
    </div>
  )
};

export default AssignEmployeeModal;
