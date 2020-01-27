import React, { useEffect } from 'react';
import AppLayout from '../common/AppLayout';
import './style.css';
import EmployeeListTable from './EmployeeListTable';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../reducers/Modals/actions';
import { fetchEmployees } from '../../reducers/Employees/operations';

const Employees = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch])
  const employees = useSelector((state: any) => state.employees.list);
  const handleOpenCreateModal = () => {
    dispatch(openModal('employeeForm'));
  };
  return (
    <AppLayout
      topbarContent={
        <div className="page-title">Employees</div>
      }
    >
      <div className="employees">
        <div className="clickable b-button p-font" onClick={handleOpenCreateModal}>Create employee</div>
        <EmployeeListTable employees={employees}/>
      </div>
    </AppLayout>
  )
}

export default Employees
