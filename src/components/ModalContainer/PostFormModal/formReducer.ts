export interface PostFormState {
  imageUrl: {value: string, error: string};
  title: {value: string, error: string};
  content: {value: string , error: string};
  formValid: boolean;
}

export const initialState: PostFormState = {
  imageUrl: {value: '', error: ''},
  title: {value: '', error: ''},
  content: {value: '', error: ''},
  formValid: false,
};

function validateForm(state: PostFormState) {
  return state;
}

function createInputObject(value: any = '') {
  return { value, error: '' };
}

function setInitialValues(data: any) {
  return {
    imageUrl: createInputObject(data.imageUrl),
    title: createInputObject(data.title),
    content: createInputObject(data.content),
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