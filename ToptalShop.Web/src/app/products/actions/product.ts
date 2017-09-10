import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../catalog/models';

export const SAVE_PRODUCT = '[Product] Save Product';
export const SAVE_PRODUCT_RESET = '[Product] Save Product Reset';
export const SAVE_PRODUCT_SUCCESS = '[Product] Save Product Success';
export const SAVE_PRODUCT_FAILURE = '[Product] Save Product Failure';
export const DELETE_PRODUCT = '[Product] Delete Product';
export const DELETE_PRODUCT_SUCCESS = '[Product] Delete Product Success';
export const DELETE_PRODUCT_FAILURE = '[Product] Delete Product Failure';

export class SaveProductReset implements Action {
  readonly type = SAVE_PRODUCT_RESET;
}

export class SaveProduct implements Action {
  readonly type = SAVE_PRODUCT;

  constructor(public payload: Product) { }
}

export class SaveProductSuccess implements Action {
  readonly type = SAVE_PRODUCT_SUCCESS;

  constructor() { }
}

export class SaveProductFailure implements Action {
  readonly type = SAVE_PRODUCT_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

export class DeleteProduct implements Action {
  readonly type = DELETE_PRODUCT;

  constructor(public payload: string) { }
}

export class DeleteProductSuccess implements Action {
  readonly type = DELETE_PRODUCT_SUCCESS;

  constructor() { }
}

export class DeleteProductFailure implements Action {
  readonly type = DELETE_PRODUCT_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

export type Actions =
  | SaveProduct
  | DeleteProduct
  | DeleteProductSuccess
  | DeleteProductFailure
  | SaveProductSuccess
  | SaveProductFailure
  | SaveProductReset
  ;
