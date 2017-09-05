import { Action } from '@ngrx/store';
import { Product } from '../models/product';

export const LOAD_PRODUCTS = '[Products] Load Products';
export const LOAD_PRODUCTS_SUCCESS = '[Products] Load Products Success';
export const LOAD_PRODUCTS_FAILED = '[Products] Load Products Failed';

import { HttpErrorResponse } from '@angular/common/http';

export class LoadAction implements Action {
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

export type Actions =
  | LoadAction
  | LoadSuccessAction
  | LoadFailedAction
  ;
