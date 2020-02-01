import { fetchEmployeesStart, fetchEmployeesSuccess, fetchEmployeesFail } from './actions';
import { dataProvider } from '../../utils/requestBuilder';
import { pushNotification } from '../Notifications/operations';
export const fetchEmployees = () => (dispatch: Function, getState: Function) => {
  dispatch(fetchEmployeesStart());
  dataProvider().post('employees/list', { offset: 0, limit: 999 })
    .then(response => {
      const { result } = response.data;
      const employees = result.map((employee: any) => ({
        id: employee.user_id,
        firstName: employee.first_name,
        lastName: employee.last_name,
        login: employee.login,
        email: employee.email,
        shopsAssigned: employee.workplaces,
      }))
      dispatch(fetchEmployeesSuccess(employees));
    })
    .catch(error => {
      dispatch(pushNotification('Failed to fetch employees', 'error', 2000));
      dispatch(fetchEmployeesFail());
    });
};
