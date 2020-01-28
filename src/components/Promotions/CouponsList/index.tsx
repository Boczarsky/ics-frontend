import React, { useEffect } from 'react';
import './style.css';
import Coupon from './Coupon';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCoupons } from '../../../reducers/Coupons/operations';

const CouponsList = () => {
  const coupons = useSelector((state: any) => state.coupons.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch])
  return (
    <div className="coupon-list">
      {coupons.map((coupon: any) => <Coupon icecreamShopData={coupon.icecreamShopData} couponData={coupon.couponData}/>)}
    </div>
  )
};

export default CouponsList;;
