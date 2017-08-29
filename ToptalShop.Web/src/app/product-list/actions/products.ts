import { Action } from '@ngrx/store';
import { Product } from '../models/product';

export const LOAD_PRODUCTS = '[Products] Load';
export const LOAD_PRODUCTS_SUCCESS = '[Products] Load Success';

export class LoadProductsAction implements Action {
  readonly type = LOAD_PRODUCTS;
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_PRODUCTS_SUCCESS;

  constructor(public payload: Product[]) {}
}

export type Actions =
  | LoadProductsAction
  | LoadSuccessAction;
