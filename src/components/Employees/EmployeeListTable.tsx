import React from 'react';
import './style.css';
import { openModal } from '../../reducers/Modals/actions';
import { useDispatch } from 'react-redux';
import { dataProvider } from '../../utils/requestBuilder';
import { pushNotification } from '../../reducers/Notifications/operations';
import { fetchEmployeesSuccess } from '../../reducers/Employees/actions';
import { useTranslation } from 'react-i18next';

export interface EmployeeListTableProps {
  employees: {
    id: number;
    firstName: string;
    lastName: string;
    login: string;
    email: string;
    shopsAssigned: {id: number, name: string}[];
  }[]
}

const EmployeeListTable = (props: EmployeeListTableProps) => {
  const {employees} = props;
  const dispatch = useDispatch();
  const handleOpenEditModal = (employee: any) => () => {
    dispatch(openModal('employeeForm', employee));
  };
  const handleOpenAssignModal = (employee: any) => () => {
    dispatch(openModal('assignEmployee', { employee }));
  };
  const handleDelete = (employeeId: number) => () => {
    dataProvider().post('employees/delete', { userId: employeeId })
      .then((response: any) => {
        dispatch(fetchEmployeesSuccess(employees.filter(emp => emp.id !== employeeId)));
      })
      .catch((error: any) => {
        dispatch(pushNotification('Error during deletion', 'error', 2000));
      });
  }
  const { t } = useTranslation();
  return (
    <div className="employee-list-table">
      <table>
          <thead>
            <tr>
              <th>{t('Id')}</th>
              <th>{t('First name')}</th>
              <th>{t('Last name')}</th>
              <th>{t('Username')}</th>
              <th>{t('Email')}</th>
              <th>{t('Shops assigned')}</th>
              <th colSpan={3}></th>
            </tr>
          </thead>
          <tbody>
          {employees.map(employee => (
            <tr key={`employee-list-row-${employee.id}`}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.login}</td>
              <td>{employee.email}</td>
              <td><div className="f-col-center">{employee.shopsAssigned.map(icecreamShop => (<span key={`icecream-shop-${icecreamShop.id}`}>{icecreamShop.name}</span>))}</div></td>
              <td><div className="clickable p-font b-button" onClick={handleOpenEditModal(employee)}>{t('Edit')}</div></td>
              <td><div className="clickable p-font b-button" onClick={handleOpenAssignModal(employee)}>{t('Assign')}</div></td>
              <td><div className="clickable p-font b-button b-button--red" onClick={handleDelete(employee.id)}>{t('Delete')}</div></td>
            </tr>
          ))}
          </tbody>
      </table>
    </div>
  )
};

export default EmployeeListTable;
