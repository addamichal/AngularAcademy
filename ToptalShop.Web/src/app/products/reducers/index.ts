import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromProduct from './product';

export interface State extends fromRoot.State {
  productPage: fromProduct.State;
}

export const reducers = {
  productPage: fromProduct.reducer
};

export const selectProducts = createFeatureSelector<State>('products');

export const selectProduct = createFeatureSelector<State>('products');
export const selectProductProductPage = createSelector(selectProduct, (state: State) => state.productPage);

export const getProductPageError = createSelector(
  selectProductProductPage,
  fromProduct.getError
);

export const getProductPagePending = createSelector(
  selectProductProductPage,
  fromProduct.getPending
);

export const getProductPageSuccess = createSelector(
  selectProductProductPage,
  fromProduct.getSuccess
);

export const getProductPageDeleteError = createSelector(
  selectProductProductPage,
  fromProduct.getDeleteError
);

export const getProductPageDeleteSuccess = createSelector(
  selectProductProductPage,
  fromProduct.getDeleteSuccess
);
