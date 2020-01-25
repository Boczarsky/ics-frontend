import React from 'react';
import { useSelector } from 'react-redux';
import './style.css';
import AddPointsModal from './AddPointsModal';
import RedeemCouponModal from './RedeemCouponModal';
import CreatePromotionModal from './CreatePromotionModal';
import EmployeeFormModal from './EmployeeFormModal';
import AssignEmployeeModal from './AssignEmployeeModal';
import AssignShopModal from './AssignShopModal';
import FlavourFormModal from './FlavourForm';
import PostFormModal from './PostFormModal';

const ModalContainer = () => {
  const addPoints = useSelector((state: any) => state.modals.addPoints);
  const redeemCoupon = useSelector((state: any) => state.modals.redeemCoupon);
  const createPromotion = useSelector((state: any) => state.modals.createPromotion);
  const employeeForm = useSelector((state: any) => state.modals.employeeForm);
  const assignEmployee = useSelector((state: any) => state.modals.assignEmployee);
  const assignShop = useSelector((state: any) => state.modals.assignShop);
  const flavourForm = useSelector((state: any) => state.modals.flavourForm);
  const postForm = useSelector((state: any) => state.modals.postForm);
  return (
    <div className="modal-container">
      {addPoints && <AddPointsModal/>}
      {redeemCoupon && <RedeemCouponModal/>}
      {createPromotion && <CreatePromotionModal/>}
      {employeeForm && <EmployeeFormModal data={employeeForm}/>}
      {assignEmployee && <AssignEmployeeModal data={assignEmployee}/>}
      {assignShop && <AssignShopModal data={assignShop}/>}
      {flavourForm && <FlavourFormModal data={flavourForm}/>}
      {postForm && <PostFormModal data={postForm}/>}
    </div>
  )
}

export default ModalContainer
