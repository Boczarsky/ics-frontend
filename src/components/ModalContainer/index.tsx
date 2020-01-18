import React from 'react';
import { useSelector } from 'react-redux';
import './style.css';
import AddPointsModal from './AddPointsModal';
import RedeemCouponModal from './RedeemCouponModal';
import CreatePromotionModal from './CreatePromotionModal';
import EmployeeFormModal from './EmployeeFormModal';
import AssignEmployeeModal from './AssignEmployeeModal';

const ModalContainer = () => {
  const addPoints = useSelector((state: any) => state.modals.addPoints);
  const redeemCoupon = useSelector((state: any) => state.modals.redeemCoupon);
  const createPromotion = useSelector((state: any) => state.modals.createPromotion);
  const employeeForm = useSelector((state: any) => state.modals.employeeForm);
  const assignEmployee = useSelector((state: any) => state.modals.assignEmployee);
  return (
    <div className="modal-container">
      {addPoints && <AddPointsModal/>}
      {redeemCoupon && <RedeemCouponModal/>}
      {createPromotion && <CreatePromotionModal/>}
      {employeeForm && <EmployeeFormModal data={employeeForm}/>}
      {assignEmployee && <AssignEmployeeModal data={assignEmployee}/>}
    </div>
  )
}

export default ModalContainer
