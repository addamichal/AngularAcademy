import { Action } from '@ngrx/store';
import { Product } from '../models/product';

export const LOAD_PRODUCTS = '[Products] Load Products';
export const LOAD_PRODUCTS_SUCCESS = '[Products] Load Products Success';
export const LOAD_PRODUCTS_FAILED = '[Products] Load Products Failed';
export const INCREMENT_PRODUCT_QUANTITY = '[Products] Add Product to cart';
export const CHANGE_PRODUCT_QUANTITY = '[Products] Change Product to cart';
export const REMOVE_PRODUCT_FROM_CART = '[Products] Remove Product to cart';

import { HttpErrorResponse } from '@angular/common/http';

export class LoadProductsAction implements Action {
  readonly type = LOAD_PRODUCTS;
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_PRODUCTS_SUCCESS;

  constructor(public payload: Product[]) {}
}

export class LoadFailedAction implements Action {
  readonly type = LOAD_PRODUCTS_FAILED;

  constructor(public payload: HttpErrorResponse) {}
}

export class AddProductToCart implements Action {
  readonly type = INCREMENT_PRODUCT_QUANTITY;

  constructor(public productId: number, public quantity: number) { }
}

export class SelectProduct implements Action {
  readonly type = INCREMENT_PRODUCT_QUANTITY;
  constructor(public productId: number, public quantity: number) { }
}

export class ChangeProductQuantity implements Action {
  readonly type = CHANGE_PRODUCT_QUANTITY;

  constructor(public productId: number, public quantity: number) { }
}

export class RemoveProductFromCart implements Action {
  readonly type = REMOVE_PRODUCT_FROM_CART;

  constructor(public productId: number) {}
}

export type Actions =
  | LoadProductsAction
  | LoadSuccessAction
  | LoadFailedAction
  | AddProductToCart
  | ChangeProductQuantity
  | RemoveProductFromCart
  ;
