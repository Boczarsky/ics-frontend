export interface CreateIcecreamShopFormState {
  logoUrl: {value: string, error: string};
  backgroundUrl: {value: string, error: string};
  name: {value: string, error: string};
  description: {value: string, error: string};
  street: {value: string, error: string};
  city: {value: string, error: string};
  postalCode: {value: string, error: string};
  latitude: {value: string, error: string};
  longitude: {value: string, error: string};
  openDays: {
    dayFrom: {value: string, error: string},
    dayTo: {value: string, error: string},
    hourFrom: {value: string, error: string},
    hourTo: {value: string, error: string}
  }[];
  specialDays: {
    closed: boolean,
    from: {value: string, error: string},
    to: {value: string, error: string},
    hourFrom: {value: string, error: string},
    hourTo: {value: string, error: string}
  }[]
  formValid: boolean;
}

export const initialState: CreateIcecreamShopFormState = {
  logoUrl: {value: '', error: ''},
  backgroundUrl: {value: '', error: ''},
  name: {value: '', error: ''},
  description: {value: '', error: ''},
  street: {value: '', error: ''},
  city: {value: '', error: ''},
  postalCode: {value: '', error: ''},
  latitude: {value: '', error: ''},
  longitude: {value: '', error: ''},
  openDays: [{
    dayFrom: {value: '', error: ''},
    dayTo: {value: '', error: ''},
    hourFrom: {value: '', error: ''},
    hourTo: {value: '', error: ''}
  }],
  specialDays: [{
    closed: true,
    from: {value: '', error: ''},
    to: {value: '', error: ''},
    hourFrom: {value: '', error: ''},
    hourTo: {value: '', error: ''}
  }],
  formValid: false,
};

export function reducer(state: any, action: any) {
  function validateForm(state: CreateIcecreamShopFormState) {
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