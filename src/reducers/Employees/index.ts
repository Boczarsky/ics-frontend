import { FETCH_EMPLOYEES_SUCCESS, FETCH_EMPLOYEES_FAIL, FETCH_EMPLOYEES_START } from './action-types';
export interface EmployeesState {
  list: any[];
  loading: Boolean;
  error: Object;
}

const initialState: EmployeesState = {
  list: [],
  loading: false,
  error: {},
};

export const employees = (state: EmployeesState = initialState, action: any) => {
  switch (action.type) {
    case FETCH_EMPLOYEES_START:
      return {...state, loading: true, error: {}}
    case FETCH_EMPLOYEES_SUCCESS:
      return {...state, list: action.payload, loading: false};
    case FETCH_EMPLOYEES_FAIL:
      return {...state, list: [], loading: false, error: action.payload};
    default:
      return state
  }
}