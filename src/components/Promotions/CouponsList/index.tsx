import React, { useEffect } from 'react';
import './style.css';
import Coupon from './Coupon';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCoupons } from '../../../reducers/Coupons/operations';
import randomKey from '../../../utils/randomKey';

const CouponsList = () => {
  const coupons = useSelector((state: any) => state.coupons.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch])
  return (
    <div className="coupon-list">
      {coupons.map((coupon: any) => <Coupon key={randomKey()} icecreamShopData={coupon.icecreamShopData} couponData={coupon.couponData}/>)}
    </div>
  )
};

export default CouponsList;;
