import * as product from '../actions/products';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartDetails, Product, CartSummary, CartDetailsLine } from '../models';

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
    case product.INCREMENT_PRODUCT_QUANTITY: {
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
    case product.CHANGE_PRODUCT_QUANTITY: {
      const cartCopy = Object.assign({}, state.cart);

      const productId = action.productId;
      const quantity = action.quantity;

      cartCopy[productId] = quantity;

      return {
        products: state.products,
        cart: cartCopy
      };
    }
    case product.REMOVE_PRODUCT_FROM_CART: {
      const cartCopy = Object.assign({}, state.cart);
      const productId = action.productId;

      if (cartCopy.hasOwnProperty(productId)) {
        delete cartCopy[productId];
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

export const getCartSummary = createSelector(
  getProducts,
  getCart,
  (products, cart) => {
    const cartSummary: CartSummary = {
      totalItems: 0,
      totalPrice: 0
    };

    for (const productId of getCartProductIds(cart)) {
      const quantity = cart[productId];
      const product = products.filter(p => p.productId === productId)[0];
      cartSummary.totalPrice += product.price * quantity;
      cartSummary.totalItems += quantity;
    }
    return cartSummary;
  }
);

export const getCartDetails = createSelector(
  getProducts,
  getCart,
  (products, cart) => {
      const cartDetails = {} as CartDetails;
      cartDetails.total = 0;
      cartDetails.lines = [];

      for (const productId of getCartProductIds(cart)) {
        const line = {} as CartDetailsLine;
        const product = products.filter(p => p.productId === productId)[0];
        line.productId = product.productId;
        line.price = product.price;
        line.productName = product.name;
        line.quantity = cart[productId];
        line.subTotal = line.price * line.quantity;

        cartDetails.total += line.subTotal;

        cartDetails.lines.push(line);
      }

      return cartDetails;
  }
);

function getCartProductIds(cart: { [productId: number]: number }) {
  return Object.keys(cart).map(key => +key);
}
