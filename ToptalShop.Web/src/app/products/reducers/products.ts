import * as products from '../actions/products';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from '../models/product';

export interface State {
  productsLoaded: boolean;
  products: Product[];
}

export const initialState: State = {
  productsLoaded: false,
  products: []
};

export function reducer(
  state = initialState,
  action: products.Actions): State {

  switch (action.type) {
    case products.LOAD_PRODUCTS_SUCCESS: {
      const products = action.payload;
      return {
        productsLoaded: true,
        products: products,
      };
    }
  }

  return state;
}

export const getProducts = (state: State) => state.products;
export const getProductsLoaded = (state: State) => state.productsLoaded;
