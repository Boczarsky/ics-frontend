import { fetchEmployeesStart, fetchEmployeesSuccess } from './actions';
export const fetchEmployees = () => (dispatch: Function, getState: Function) => {
  dispatch(fetchEmployeesStart());
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
  dispatch(fetchEmployeesSuccess(employees));
};
