import * as fromProduct from '../product-list/reducers/products';
import { ActionReducerMap, ActionReducer, MetaReducer, createSelector } from '@ngrx/store';
import { environment } from '../../environments/environment';

export interface State {
  catalog: fromProduct.CatalogState;
}

export const reducers: ActionReducerMap<State> = {
  catalog: fromProduct.reducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('before state', state);
    console.log('action', action);

    const result = reducer(state, action);

    console.log('after state', result);
    return result;
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
? [logger]
: [];

export const getCatalog = (state: State) => state.catalog;
export const getProducts = createSelector(getCatalog, fromProduct.getProducts);