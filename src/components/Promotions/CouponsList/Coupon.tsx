import React from 'react';
import './style.css';
import ShopHeader from '../../common/ShopOverview/ShopHeader';
import { ReactComponent as CheckIcon } from '../../../icons/check.svg';
import randomKey from '../../../utils/randomKey';

export interface CouponProps {
  icecreamShopData: {
    logoUrl: string,
    name: string,
    address: string,
  }
  couponData: {
    id: number,
    prize: string,
    info: string,
    limit: number,
    count: number,
    startDate: string,
    endDate: string,
  }
}

const Coupon = (props: CouponProps) => {
  const { icecreamShopData, couponData } = props;
  return (
    <div className="coupon">
      <div className="coupon__id">#{couponData.id}</div>
      <div className="coupon__wrapper">
        <div className="coupon__header">
          <div className="coupon__header-left">
            <ShopHeader
              headerData={icecreamShopData}
            />
          </div>
          <div className="coupon__header-right">
            <div className="coupon__prize">{couponData.prize}</div>
          </div>
        </div>
        <div className="coupon__content">
          <div className="coupon__content-left">
            {new Array(couponData.count).fill(
              <div key={randomKey()} className="coupon__stamp-field">
                <CheckIcon className="coupon__stamp"/>
              </div>
            )}
            {new Array(couponData.limit - couponData.count).fill(
              <div key={randomKey()} className="coupon__stamp-field"/>
            )}
          </div>
          <div className="coupon__content-right">
            <div className="coupon__info">{couponData.info}</div>
            <div className="coupon__promotion-duration">
              <span>Promotion duration:</span>
              <span>{couponData.startDate}<span className="coupon__spacer">-</span>{couponData.endDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Coupon;
