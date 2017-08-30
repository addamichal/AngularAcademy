import { Product } from '../models/product';
import * as product from '../actions/products';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface CatalogState {
  products: Product[];
  cart: { [productId: number]: number };
}

export const initialState: CatalogState = {
  products: [],
  cart: {}
};

export function reducer(
  state = initialState,
  action: product.Actions
): CatalogState {

  switch (action.type) {
    case product.LOAD_PRODUCTS_SUCCESS: {
      const products = action.payload;
      return {
        products: products,
        cart: state.cart
      };
    }
    case product.ADD_PRODUCT_TO_CART: {
      const cartCopy = Object.assign({}, state.cart);

      const productId = action.productId;
      const quantity = action.quantity;

      if (cartCopy.hasOwnProperty(productId)) {
        cartCopy[productId] += quantity;
      } else {
        cartCopy[productId] = quantity;
      }

      return {
        products: state.products,
        cart: cartCopy
      };
    }
  }

  return state;
}

export const getProducts = (state: CatalogState) => state.products;
export const getCart = (state: CatalogState) => state.cart;

export const getCartTotal = createSelector(
  getProducts,
  getCart,
  (products, cart) => {
    let total = 0;
    for (const productId of Object.keys(cart)) {
      const quantity = cart[productId];
      const product = products.filter(p => p.productId === +productId)[0];
      total += product.price * quantity;
    }
    return total;
  }
);
