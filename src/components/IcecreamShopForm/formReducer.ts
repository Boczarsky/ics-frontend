import randomKey from "../../utils/randomKey";

export interface CreateIcecreamShopFormState {
  logoUrl: {value: string, error: string};
  backgroundUrl: {value: string, error: string};
  name: {value: string, error: string};
  description: {value: string, error: string};
  street: {value: string, error: string};
  city: {value: string, error: string};
  postalCode: {value: string, error: string};
  googleMapLink: {value: string, error: string};
  openDays: {
    uniqueKey: string;
    openFrom: {value: string, error: string},
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
}

export const initialState: CreateIcecreamShopFormState = {
  logoUrl: {value: '', error: ''},
  backgroundUrl: {value: '', error: ''},
  name: {value: '', error: ''},
  description: {value: '', error: ''},
  street: {value: '', error: ''},
  city: {value: '', error: ''},
  postalCode: {value: '', error: ''},
  googleMapLink: {value: '', error: ''},
  openDays: [],
  specialDays: [],
  formValid: false,
};

const emptyDynamicField = {
  openDays: {
    uniqueKey: '',
    openFrom: {value: '1', error: ''},
    openTo: {value: '1', error: ''},
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
  return state;
}

function setInitialValues(data: any) {
 return {
  logoUrl: {value: data.logoUrl || '', error: ''},
  backgroundUrl: {value: data.backgroundUrl || '', error: ''},
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
        openFrom: {value: openDay.openFrom || '', error: ''},
        openTo: {value: openDay.openTo || '', error: ''},
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
      console.log(payload);
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