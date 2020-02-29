import React from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../reducers/Modals/actions';
import moment from 'moment';
import { dataProvider } from '../../../utils/requestBuilder';
import { pushNotification } from '../../../reducers/Notifications/operations';
import { fetchPromotions } from '../../../reducers/Promotions/operations';
import { useTranslation } from 'react-i18next';

export interface PromotionListTableProps {
  promotions: {
    id: number;
    info: string;
    prize: string;
    limit: number;
    startDate: string;
    endDate: string;
    icecreamShops: any[];
  }[];
}

const PromotionListTable = (props: PromotionListTableProps) => {
  const { promotions } = props;
  const dispatch = useDispatch();
  const openAssignModal = (promotionId: number, assignedShops: number[]) => () => {
    dispatch(openModal('assignShop', {promotionId, assignedShops}));
  }
  const handleEndPromotion = (promotionId: number) => () => {
    dataProvider().post('promotions/remove', {promotionId})
      .then(() => {
        dispatch(fetchPromotions());
      })
      .catch(() => {
        dispatch(pushNotification('Error during removing promotion', 'error', 2000));
      })
  }
  const { t } = useTranslation();
  return (
    <div className="promotion-list-table">
      <table>
          <tr>
            <th>{t('Id')}</th>
            <th>{t('Info')}</th>
            <th>{t('Prize')}</th>
            <th>{t('Limit')}</th>
            <th>{t('Start dat')}e</th>
            <th>{t('End date')}</th>
            <th>{t('Icecream shops involved')}</th>
            <th colSpan={2}></th>
          </tr>
          {promotions.map(promotion => (
          <tr key={`promotion-list-row-${promotion.id}`}>
            <td style={{width: 30}}>{promotion.id}</td>
            <td>{promotion.info}</td>
            <td style={{width: 160}}>{promotion.prize}</td>
            <td style={{width: 30}}>{promotion.limit}</td>
            <td style={{width: 100}}>{moment(promotion.startDate).format('DD/MM/YYYY')}</td>
            <td style={{width: 100}}>{moment(promotion.endDate).format('DD/MM/YYYY')}</td>
          <td style={{width: 160}}><div className="f-col-center">{promotion.icecreamShops.map(icecreamShop => (<span>{icecreamShop.name} - {icecreamShop.city}, {icecreamShop.street}</span>))}</div></td>
            <td style={{width: 220}}><div className="clickable p-font b-button" onClick={openAssignModal(promotion.id, promotion.icecreamShops.map(shop => shop.value))}>{t('Assign icecream shop')}</div></td>
            <td style={{width: 200}}><div className="clickable p-font b-button b-button--red" onClick={handleEndPromotion(promotion.id)}>{t('End promotion')}</div></td>
          </tr>
          ))}
      </table>
    </div>
  )
};

export default PromotionListTable;
