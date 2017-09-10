import * as fromProduct from '../catalog/reducers/products';
import * as login from '../login/actions/login';
import { ActionReducerMap, ActionReducer, MetaReducer, createSelector } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface State {
  catalog: fromProduct.State;
}

export const reducers: ActionReducerMap<State> = {
  catalog: fromProduct.reducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state: State, action: any): State {
    console.log('before state', state);
    console.log('action', action);

    const result = reducer(state, action);

    console.log('after state', result);
    return result;
  };
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: [{ login: ['status'] }, { catalog: ['cart'] }], rehydrate: true })(reducer);
}

export function logout(reducer) {
  return function (state, action) {
    return reducer(action.type === login.LOGOUT ? { catalog: state.catalog } : state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, localStorageSyncReducer, logout]
  : [localStorageSyncReducer, logout];

export const getCatalog = (state: State) => state.catalog;
export const getProducts = createSelector(getCatalog, fromProduct.getProducts);
export const getCart = createSelector(getCatalog, fromProduct.getCart);
export const getCartSummary = createSelector(getCatalog, fromProduct.getCartSummary);
export const getCartDetails = createSelector(getCatalog, fromProduct.getCartDetails);
export const getProductsLoaded = createSelector(getCatalog, fromProduct.getProductsLoaded);
