import React from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import userType from '../../enums/userType';
import { dataProvider } from '../../utils/requestBuilder';
import { pushNotification } from '../../reducers/Notifications/operations';
import { useTranslation } from 'react-i18next';

export interface ShopPromotionsProps {
  promotions: any;
}

const ShopPromotions = (props: ShopPromotionsProps) => {
  const {promotions} = props;
  const dispatch = useDispatch();
  const uType = useSelector((state: any) => state.auth.userType);
  const handleTakeCoupon = (promotionId: number) => () => {
    dataProvider().post('promotions/coupon/create', { promotionId })
      .then(() => {
        dispatch(pushNotification('Coupon taken', 'normal', 2000));
      })
      .catch((error) => {
        if (error.response && error.response.data.message === 'AlreadyExist') {
          dispatch(pushNotification('Already own that coupon', 'normal', 2000));
        } else {
          dispatch(pushNotification('Error during creating coupon', 'error', 2000));
        }
      })
  };
  const { t } = useTranslation();
  return (
    <div className="shop-promotions-table">
      <table>
          <thead>
            <tr>
              <th>{t('Info')}</th>
              <th>{t('Prize')}</th>
              <th>{t('Start date')}</th>
              <th>{t('End date')}</th>
              {uType === userType.client && <th></th>}
            </tr>
          </thead>
          <tbody>
          {promotions.map((promotion: any) => (
            <tr key={`shop-promotions-row-${promotion.id}`}>
              <td style={{minWidth: 260}}>{promotion.info}</td>
              <td style={{width: 160}}>{promotion.prize}</td>
              <td style={{width: 100}}>{moment(promotion.startDate).format('DD/MM/YYYY')}</td>
              <td style={{width: 100}}>{moment(promotion.endDate).format('DD/MM/YYYY')}</td>
              {uType === userType.client && <td style={{width: 220}}><div className="clickable p-font b-button" onClick={handleTakeCoupon(promotion.id)}>{t('Take coupon')}</div></td>}
            </tr>
          ))}
          </tbody>
      </table>
    </div>
  );
};

export default ShopPromotions;
