export interface CreatePromotionState {
  info: {value: string, error: string};
  prize: {value: string, error: string};
  limit: {value: number , error: string};
  startDate: {value: string , error: string};
  endDate: {value: string , error: string};
  formValid: boolean;
}

export const initialState: CreatePromotionState = {
  info: {value: '', error: ''},
  prize: {value: '', error: ''},
  limit: {value: 0 , error: ''},
  startDate: {value: '' , error: ''},
  endDate: {value: '' , error: ''},
  formValid: false,
};

function validateForm(state: CreatePromotionState) {
  if (!state.info.value) {
    state.info.error = 'This field is required';
    state.formValid = false;
  }
  if (!state.prize.value) {
    state.prize.error = 'This field is required';
    state.formValid = false;
  }
  if (Number(state.limit.value) <= 0) {
    state.limit.error = 'Must be greater than 0';
    state.formValid = false;
  }
  if (!state.startDate.value) {
    state.startDate.error = 'This field is required';
    state.formValid = false;
  }
  if (!state.endDate.value) {
    state.endDate.error = 'This field is required';
    state.formValid = false;
  }
  if (new Date(state.endDate.value) < new Date(state.startDate.value)) {
    state.endDate.error = 'End date later than start date';
    state.formValid = false;
  }
  return state;
}

export function reducer(state: any, action: any) {
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

export const setInitial = (data: any) => ({type: 'SET_INITIAL', payload: data});

export const setValue = (key: string, value: any) => ({type: 'SET_VALUE', payload: {key, value}});

export const clearForm = () => ({type: 'CLEAR_FORM'});