import React from 'react';
import './style.css';
import Coupon from './Coupon';

const CouponsList = () => {
  const coupons = [
    {
      icecreamShopData: {
        logoUrl: '',
        name: 'Cool Icecream Shop Name',
        address: 'Some St. 1105/15, City 14-510',
      },
      couponData: {
        id: 1,
        prize: 'Free Icecream',
        info: 'Every tenth icecream is free!',
        limit: 9,
        count: 1,
        startDate: '2020-01-18',
        endDate: '2020-03-18',
      }
    }
  ];
  return (
    <div className="coupon-list">
      {coupons.map(coupon => <Coupon icecreamShopData={coupon.icecreamShopData} couponData={coupon.couponData}/>)}
    </div>
  )
};

export default CouponsList;;
