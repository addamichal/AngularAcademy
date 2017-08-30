import { Action } from '@ngrx/store';
import { Product } from '../models/product';

export const LOAD_PRODUCTS = '[Products] Load Products';
export const LOAD_PRODUCTS_SUCCESS = '[Products] Load Products Success';
export const ADD_PRODUCT_TO_CART = '[Products] Add Product to cart';

export class LoadProductsAction implements Action {
  readonly type = LOAD_PRODUCTS;
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_PRODUCTS_SUCCESS;

  constructor(public payload: Product[]) {}
}

export class AddProductToCart implements Action {
  readonly type = ADD_PRODUCT_TO_CART;

  constructor(public productId: number, public quantity: number) { }
}

export type Actions =
  | LoadProductsAction
  | LoadSuccessAction
  | AddProductToCart
  ;
