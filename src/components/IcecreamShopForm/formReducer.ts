import randomKey from "../../utils/randomKey";

export interface CreateIcecreamShopFormState {
  logoFileName: {value: string, error: string};
  backgroundFileName: {value: string, error: string};
  name: {value: string, error: string};
  description: {value: string, error: string};
  street: {value: string, error: string};
  city: {value: string, error: string};
  postalCode: {value: string, error: string};
  googleMapLink: {value: string, error: string};
  openDays: {
    uniqueKey: string;
    from: {value: string, error: string},
    openTo: {value: string, error: string},
    hourFrom: {value: string, error: string},
    hourTo: {value: string, error: string}
  }[];
  specialDays: {
    uniqueKey: string;
    closed: boolean,
    from: {value: string, error: string},
    to: {value: string, error: string},
    hourFrom: {value: string, error: string},
    hourTo: {value: string, error: string}
  }[]
  formValid: boolean;
  touched: boolean;
}

export const initialState: CreateIcecreamShopFormState = {
  logoFileName: {value: '', error: ''},
  backgroundFileName: {value: '', error: ''},
  name: {value: '', error: ''},
  description: {value: '', error: ''},
  street: {value: '', error: ''},
  city: {value: '', error: ''},
  postalCode: {value: '', error: ''},
  googleMapLink: {value: '', error: ''},
  openDays: [],
  specialDays: [],
  formValid: false,
  touched: false,
};

const emptyDynamicField = {
  openDays: {
    uniqueKey: '',
    from: {value: '1', error: ''},
    to: {value: '1', error: ''},
    hourFrom: {value: '', error: ''},
    hourTo: {value: '', error: ''}
  },
  specialDays: {
    uniqueKey: '',
    closed: {value: '0', error: ''},
    from: {value: '', error: ''},
    to: {value: '', error: ''},
    hourFrom: {value: '', error: ''},
    hourTo: {value: '', error: ''}
  },
}

function validateForm(state: CreateIcecreamShopFormState) {
  state.touched = true;
  if (!state.name.value) {
    state.name.error = 'This field is required';
    state.formValid = false;
  }
  if (!state.description.value) {
    state.description.error = 'This field is required';
    state.formValid = false;
  }
  if (!state.street.value) {
    state.street.error = 'This field is required';
    state.formValid = false;
  }
  if (!state.city.value) {
    state.city.error = 'This field is required';
    state.formValid = false;
  }
  if (!state.postalCode.value) {
    state.postalCode.error = 'This field is required';
    state.formValid = false;
  }
  return state;
}

function setInitialValues(data: any) {
  console.log(data);
 return {
  logoFileName: {value: data.logoFileName || '', error: ''},
  backgroundFileName: {value: data.backgroundFileName || '', error: ''},
  name: {value: data.name || '', error: ''},
  description: {value: data.description || '', error: ''},
  street: {value: data.street || '', error: ''},
  city: {value: data.city || '', error: ''},
  postalCode: {value: data.postalCode || '', error: ''},
  googleMapLink: {value: data.googleMapLink || '', error: ''},
  openDays: data.openDays && data.openDays.length ? data.openDays.map(
    (openDay: any) => (
      {
        uniqueKey: randomKey(),
        from: {value: openDay.from || '', error: ''},
        to: {value: openDay.to || '', error: ''},
        hourFrom: {value: openDay.hourFrom || '', error: ''},
        hourTo: {value: openDay.hourTo || '', error: ''}
      }
    )
  ) : [],
  specialDays: data.specialDays && data.specialDays.length ? data.specialDays.map(
    (specialDay: any) => (
      {
        uniqueKey: randomKey(),
        closed: { value: specialDay.closed || '0', error: '' },
        from: {value: specialDay.from || '', error: ''},
        to: {value: specialDay.to || '', error: ''},
        hourFrom: {value: specialDay.hourFrom || '', error: ''},
        hourTo: {value: specialDay.hourTo || '', error: ''}
      }
    )
  ) : [],
  formValid: true,
  touched: false,
 }
}

export function reducer(state: any, action: any) {
  const {type, payload} = action;
  let newState;
  switch (type) {
    case 'SET_INITIAL':
      return setInitialValues(payload);
    case 'SET_VALUE':
      return validateForm({...state, [payload.key]: {value: payload.value, error: ''}, formValid: true});
    case 'SET_DYNAMIC_VALUE':
      newState = {...state, formValid: true};
      const dynamicItem = newState[payload.key].find((item: {uniqueKey: string}) => item.uniqueKey === payload.uniqueKey);
      if (dynamicItem) {
        dynamicItem[payload.field] = {value: payload.value, error: ''}
      }
      return validateForm(newState);
    case 'ADD_DYNAMIC_VALUE':
      newState = {...state, formValid: true};
      // @ts-ignore
      newState[payload.key].push({...emptyDynamicField[payload.key], uniqueKey: randomKey()});
      return validateForm(newState);
    case 'DELETE_DYNAMIC_VALUE':
      newState = {...state, formValid: true};
      newState[payload.key] = newState[payload.key].filter((item: {uniqueKey: string}) => item.uniqueKey !== payload.uniqueKey);
      return validateForm(newState);
    case 'CLEAR_FORM':
      return initialState;
    default:
      return state;
  }
}

export const setInitial = (data: any) => ({type: 'SET_INITIAL', payload: data});

export const setValue = (key: string, value: any) => ({type: 'SET_VALUE', payload: {key, value}});

export const setDynamicValue = (key: string, uniqueKey: string, field: string, value: any) => ({type: 'SET_DYNAMIC_VALUE', payload: {key, uniqueKey, field, value}});

export const addDynamicValue = (key: string) => ({type: 'ADD_DYNAMIC_VALUE', payload: {key}});

export const deleteDynamicValue = (key: string, uniqueKey: string) => ({type: 'DELETE_DYNAMIC_VALUE', payload: {key, uniqueKey}});

export const clearForm = () => ({type: 'CLEAR_FORM'});