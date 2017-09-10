import * as product from '../actions/products';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartDetails, Product, CartSummary, CartDetailsLine } from '../models';

export interface State {
  productsLoaded: boolean;
  products: Product[];
  cart: { [productId: number]: number };
}

export const initialState: State = {
  productsLoaded: false,
  products: [],
  cart: {}
};

export function reducer(
  state = initialState,
  action: product.Actions
): State {

  switch (action.type) {
    case product.LOAD_PRODUCTS_SUCCESS: {
      const products = action.payload;
      return {
        productsLoaded: true,
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
        productsLoaded: state.productsLoaded,
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
        productsLoaded: state.productsLoaded,
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
        productsLoaded: state.productsLoaded,
        products: state.products,
        cart: cartCopy
      };
    }

    case product.RESET_CART: {
      return {
        productsLoaded: state.productsLoaded,
        products: state.products,
        cart: {}
      };
    }
  }

  return state;
}

export const getProductsLoaded = (state: State) => state.productsLoaded;
export const getProducts = (state: State) => state.products;
export const getCart = (state: State) => state.cart;

export const getCartSummary = createSelector(
  getProducts,
  getCart,
  (products, cart) => {
    const cartSummary: CartSummary = {
      totalItems: 0,
      totalPrice: 0
    };

    if (!cart || !products) {
      return cartSummary;
    }

    for (const productId of getCartProductIds(cart)) {
      const quantity = cart[productId];
      const product = products.filter(p => p.id === productId)[0];
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

    if (!cart || !products) {
      return cartDetails;
    }

    for (const productId of getCartProductIds(cart)) {
      const line = {} as CartDetailsLine;
      const product = products.filter(p => p.id === productId)[0];
      line.productId = product.id;
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
