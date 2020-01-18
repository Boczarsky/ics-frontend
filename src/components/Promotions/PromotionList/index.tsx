import React, { useState } from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../reducers/Modals/actions';
import PromotionListTable from './PromotionListTable';

const PromotionList = () => {
  const dispatch = useDispatch();
  const handleOpenCreateModal = () => {
    dispatch(openModal('createPromotion'));
  }
  const [promotions, setPromotions] = useState([
    {id: 1, info: 'Every tenth icecream is free!', prize: 'Free icecream', limit: 9, startDate: '2019-12-01', endDate: '2019-12-01', icecreamShops: ['Cool Icecream Shop Name', 'Cool Icecream Shop Namee II', 'Cool Icecream Shop Name III']},
    {id: 1, info: 'Every tenth icecream is free!', prize: 'Free icecream', limit: 9, startDate: '2019-12-01', endDate: '2019-12-01', icecreamShops: ['Cool Icecream Shop Name']},
    {id: 1, info: 'Every tenth icecream is free!', prize: 'Free icecream', limit: 9, startDate: '2019-12-01', endDate: '2019-12-01', icecreamShops: ['Cool Icecream Shop Name', 'Cool Icecream Shop Namee II', 'Cool Icecream Shop Name III']},
    {id: 1, info: 'Every tenth icecream is free!', prize: 'Free icecream', limit: 9, startDate: '2019-12-01', endDate: '2019-12-01', icecreamShops: ['Cool Icecream Shop Name', 'Cool Icecream Shop Namee II', 'Cool Icecream Shop Name III']},
    {id: 1, info: 'Every tenth icecream is free!', prize: 'Free icecream', limit: 9, startDate: '2019-12-01', endDate: '2019-12-01', icecreamShops: ['Cool Icecream Shop Name', 'Cool Icecream Shop Namee II', 'Cool Icecream Shop Name III']},
    {id: 1, info: 'Every tenth icecream is free!', prize: 'Free icecream', limit: 9, startDate: '2019-12-01', endDate: '2019-12-01', icecreamShops: ['Cool Icecream Shop Name', 'Cool Icecream Shop Namee II', 'Cool Icecream Shop Name III']},
  ]);
  return (
    <div className="promotion-list">
      <div className="clickable b-button p-font" onClick={handleOpenCreateModal}>Create promotion</div>
      <PromotionListTable promotions={promotions}/>
    </div>
  )
}

export default PromotionList;
