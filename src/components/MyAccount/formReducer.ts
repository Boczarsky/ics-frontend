export interface RegisterFormState {
  avatarFileName: {value: string, error: string}
  firstName: {value: string, error: string};
  lastName: {value: string, error: string};
  oldPassword: {value: string, error: string};
  newPassword: {value: string, error: string};
  formValid: boolean;
  passValid: boolean;
}

export const initialState: RegisterFormState = {
  avatarFileName: {value: '', error: ''},
  firstName: {value: '', error: ''},
  lastName: {value: '', error: ''},
  oldPassword: {value: '', error: ''},
  newPassword: {value: '', error: ''},
  formValid: true,
  passValid: true,
};

export function reducer(state: any, action: any) {
  function validateForm(state: RegisterFormState) {
    state.newPassword.error = '';
    if (state.firstName.value.length && !state.firstName.value.trim()) {
      state.firstName.error = 'Cannot be empty';
      state.formValid = false;
    }
    if (state.lastName.value.length && !state.lastName.value.trim()) {
      state.lastName.error = 'Cannot be empty';
      state.formValid = false;
    }
    if (state.oldPassword.value.length && !state.oldPassword.value.trim()) {
      state.oldPassword.error = 'Cannot be empty';
      state.passValid = false;
    }
    if (state.oldPassword.value && !state.newPassword.value.trim()) {
      state.newPassword.error = 'Cannot be empty';
      state.passValid = false;
    }
    return state;
  }
  const {type, payload} = action;
  switch (type) {
    case 'SET_VALUE':
      return validateForm({...state, [payload.key]: {value: payload.value, error: ''}, formValid: true, passValid: true});
    case 'CLEAR_FORM':
      return initialState;
    default:
      return state;
  }
}

export const setValue = (key: string, value: string) => ({type: 'SET_VALUE', payload: {key, value}});

export const clearForm = () => ({type: 'CLEAR_FORM'});