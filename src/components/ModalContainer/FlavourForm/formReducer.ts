export interface FlavourFormState {
  name: {value: string, error: string};
  composition: {value: string, error: string};
  tags: {value: string[] , error: string};
  formValid: boolean;
}

export const initialState: FlavourFormState = {
  name: {value: '', error: ''},
  composition: {value: '', error: ''},
  tags: {value: [], error: ''},
  formValid: false,
};

function validateForm(state: FlavourFormState) {
  if (!state.name.value.trim()) {
    state.name.error = "This field is required";
    state.formValid = false;
  }
  if (!state.composition.value.trim()) {
    state.composition.error = "This field is required";
    state.formValid = false;
  }
  return state;
}

function createInputObject(value: any = '') {
  return { value, error: '' };
}

function setInitialValues(data: any) {
 return {
  name: createInputObject(data.name),
  composition: createInputObject(data.composition),
  tags: createInputObject(data.tags || []),
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