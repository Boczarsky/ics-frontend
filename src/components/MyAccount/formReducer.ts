export interface RegisterFormState {
  avatarUrl: {value: string, error: string}
  firstName: {value: string, error: string};
  lastName: {value: string, error: string};
  oldPassword: {value: string, error: string};
  newPassword: {value: string, error: string};
  formValid: boolean;
}

export const initialState: RegisterFormState = {
  avatarUrl: {value: '', error: ''},
  firstName: {value: '', error: ''},
  lastName: {value: '', error: ''},
  oldPassword: {value: '', error: ''},
  newPassword: {value: '', error: ''},
  formValid: false,
};

export function reducer(state: any, action: any) {
  function validateForm(state: RegisterFormState) {
    return state;
  }
  const {type, payload} = action;
  switch (type) {
    case 'SET_VALUE':
      return validateForm({...state, [payload.key]: {value: payload.value, error: ''}, formValid: true});
    case 'CLEAR_FORM':
      return initialState;
    default:
      return state;
  }
}

export const setValue = (key: string, value: string) => ({type: 'SET_VALUE', payload: {key, value}});

export const clearForm = () => ({type: 'CLEAR_FORM'});