export interface RegisterFormState {
  firstName: {value: string, error: string};
  lastName: {value: string, error: string};
  username: {value: string, error: string};
  email: {value: string, error: string};
  password: {value: string, error: string};
  rePassword: {value: string, error: string};
  isCompany: {value: boolean, error: string};
  formValid: boolean;
}

export const initialState: RegisterFormState = {
  firstName: {value: '', error: ''},
  lastName: {value: '', error: ''},
  username: {value: '', error: ''},
  email: {value: '', error: ''},
  password: {value: '', error: ''},
  rePassword: {value: '', error: ''},
  isCompany: {value: false, error: ''},
  formValid: false,
};

export function reducer(state: any, action: any) {
  function validateForm(state: RegisterFormState) {
    if (!state.username.value) {
      state.username.error = 'This field is required';
      state.formValid = false;
    }
    if (!state.email.value) {
      state.email.error = 'This field is required';
      state.formValid = false;
    }
    if (!state.password.value) {
      state.password.error = 'This field is required';
      state.formValid = false;
    }
    if (state.rePassword.value !== state.password.value) {
      state.rePassword.error = 'Password and Re-password must be the same';
      state.formValid = false;
    }
    if (state.isCompany.value) {
      if (!state.firstName.value) {
        state.firstName.error = 'This field is required';
        state.formValid = false;
      }
      if (!state.lastName.value) {
        state.lastName.error = 'This field is required';
        state.formValid = false;
      }
    } else {
      if (state.firstName.error) {
        state.firstName.error = '';
      }
      if (state.lastName.error) {
        state.lastName.error = '';
      }
    }
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

export const setValue = (key: string, value: string | boolean) => ({type: 'SET_VALUE', payload: {key, value}});

export const clearForm = () => ({type: 'CLEAR_FORM'});