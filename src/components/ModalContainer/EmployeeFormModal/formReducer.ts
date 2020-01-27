export interface EmployeeFormState {
  login: {value: string, error: string};
  email: {value: string, error: string};
  firstName: {value: string, error: string};
  lastName: {value: string, error: string};
  password: {value: string, error: string};
  rePassword: {value: string, error: string};
  formValid: boolean;
}

export const initialState: EmployeeFormState = {
  login: {value: '', error: ''},
  email: {value: '', error: ''},
  firstName: {value: '', error: ''},
  lastName: {value: '', error: ''},
  password: {value: '', error: ''},
  rePassword: {value: '', error: ''},
  formValid: false,
};

function validateForm(state: EmployeeFormState) {
  return state;
}

function createInputObject(value: any = '') {
  return { value, error: '' };
}

function setInitialValues(data: any) {
 return {
  login: createInputObject(data.login),
  email: createInputObject(data.email),
  firstName: createInputObject(data.firstName),
  lastName: createInputObject(data.lastName),
  password: createInputObject(),
  rePassword: createInputObject(),
  formValid: true,
 }
}

export function reducer(state: any, action: any) {
  const {type, payload} = action;
  switch (type) {
    case 'SET_INITIAL':
      return setInitialValues(payload);
    case 'SET_VALUE':
      return validateForm({...state, [payload.key]: {value: payload.value, error: ''}, formValid: true});
    case 'CLEAR_FORM':
      return initialState;
    default:
      return state;
  }
}

export const setInitial = (data: any) => ({type: 'SET_INITIAL', payload: data});

export const setValue = (key: string, value: any) => ({type: 'SET_VALUE', payload: {key, value}});

export const clearForm = () => ({type: 'CLEAR_FORM'});