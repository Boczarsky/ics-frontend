import React, { useEffect } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../reducers/Modals/actions';
import PromotionListTable from './PromotionListTable';
import { fetchPromotions } from '../../../reducers/Promotions/operations';

const PromotionList = () => {
  const dispatch = useDispatch();
  const handleOpenCreateModal = () => {
    dispatch(openModal('createPromotion'));
  }
  const promotions = useSelector((state: any) => state.promotions.list);
  useEffect(() => {
    dispatch(fetchPromotions());
  }, [dispatch])
  return (
    <div className="promotion-list">
      <div className="clickable b-button p-font" onClick={handleOpenCreateModal}>Create promotion</div>
      <PromotionListTable promotions={promotions}/>
    </div>
  )
}

export default PromotionList;
