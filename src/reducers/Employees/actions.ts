import { FETCH_EMPLOYEES_SUCCESS, FETCH_EMPLOYEES_FAIL, FETCH_EMPLOYEES_START } from './action-types';
export const fetchEmployeesSuccess = (employees: any) => ({type: FETCH_EMPLOYEES_SUCCESS, payload: employees});
export const fetchEmployeesFail = () => ({type: FETCH_EMPLOYEES_FAIL});
export const fetchEmployeesStart = () => ({type: FETCH_EMPLOYEES_START});