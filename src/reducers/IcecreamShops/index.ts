export interface IcecreamShopsState {
  icecreamShops: any[];
  filters: Object;
}

const initialState: IcecreamShopsState = {
  icecreamShops: [],
  filters: {},
};

export const IcecreamShops = (state: IcecreamShopsState = initialState, action: any) => {
  switch (action.type) {
    default:
      return state
  }
}