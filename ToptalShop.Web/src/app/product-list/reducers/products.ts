import { Product } from '../models/product';
import * as product from '../actions/products';
import { createFeatureSelector } from '@ngrx/store';

export interface CatalogState {
  products: Product[];
}

export const initialState: CatalogState = {
  products: []
};

export function reducer(
  state = initialState,
  action: product.Actions
): CatalogState {

  switch (action.type) {
    case product.LOAD_PRODUCTS_SUCCESS: {
      const products = action.payload;
      return {
        products: products
      };
    }
  }

  return state;
}

export const getProducts = (state: CatalogState) => state.products;
