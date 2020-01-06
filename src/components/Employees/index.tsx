import React from 'react';
import AppLayout from '../common/AppLayout';
import './style.css';

const Employees = () => {
  return (
    <AppLayout
      topbarContent={
        <div className="page-title">Employees</div>
      }
    >
      <div className="employees"></div>
    </AppLayout>
  )
}

export default Employees
