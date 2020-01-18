import React from 'react';
import './style.css';
import { openModal } from '../../reducers/Modals/actions';
import { useDispatch } from 'react-redux';

export interface EmployeeListTableProps {
  employees: {
    id: number;
    firstName: string;
    lastName: string;
    login: string;
    email: string;
    shopsAssigned: string[];
  }[]
}

const EmployeeListTable = (props: EmployeeListTableProps) => {
  const {employees} = props;
  const dispatch = useDispatch();
  const handleOpenEditModal = (employeeId: number) => () => {
    dispatch(openModal('employeeForm', {employeeId}));
  };
  const handleOpenAssignModal = (employeeId: number) => () => {
    dispatch(openModal('assignEmployee', {employeeId}));
  };
  return (
    <div className="employee-list-table">
      <table>
          <tr>
            <th>Id</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Shops assigned</th>
            <th colSpan={3}></th>
          </tr>
          {employees.map(employee => (
          <tr key={`employee-list-row-${employee.id}`}>
            <td>{employee.id}</td>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.login}</td>
            <td>{employee.email}</td>
            <td><div className="f-col-center">{employee.shopsAssigned.map(icecreamShop => (<span>{icecreamShop}</span>))}</div></td>
            <td><div className="clickable p-font b-button" onClick={handleOpenEditModal(employee.id)}>Edit</div></td>
            <td><div className="clickable p-font b-button" onClick={handleOpenAssignModal(employee.id)}>Assign</div></td>
            <td><div className="clickable p-font b-button b-button--red">Delete</div></td>
          </tr>
          ))}
      </table>
    </div>
  )
};

export default EmployeeListTable;
