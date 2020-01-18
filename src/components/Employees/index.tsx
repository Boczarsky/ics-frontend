import React from 'react';
import AppLayout from '../common/AppLayout';
import './style.css';
import EmployeeListTable from './EmployeeListTable';
import { useDispatch } from 'react-redux';
import { openModal } from '../../reducers/Modals/actions';

const Employees = () => {
  const employees = [
    {
      id: 1,
      firstName: 'Mark',
      lastName: 'Ketting',
      login: 'truemarkketing',
      email: 'mark.ketting@gmail.com',
      shopsAssigned: ['Cool Icecream Shop Name', 'Cool Icecream Shop Name II'],
    },
    {
      id: 2,
      firstName: 'Elen',
      lastName: 'Onora',
      login: 'theelenonora',
      email: 'elen.onora@gmail.com',
      shopsAssigned: ['Cool Icecream Shop Name'],
    },
    {
      id: 3,
      firstName: 'Iccy',
      lastName: 'Creeam',
      login: 'iceycreamy',
      email: 'iccy.creeam@gmail.com',
      shopsAssigned: ['Cool Icecream Shop Name II'],
    }
  ];
  const dispatch = useDispatch();
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
