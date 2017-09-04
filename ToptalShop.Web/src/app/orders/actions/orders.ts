import { Action } from '@ngrx/store';
import { Order } from '../models/order';

export const LOAD_ORDERS = '[Orders] Load Orders';
export const LOAD_ORDERS_SUCCESS = '[Orders] Load Orders Success';
export const LOAD_ORDERS_FAILED = '[Orders] Load Orders Failed';

import { HttpErrorResponse } from '@angular/common/http';

export class LoadAction implements Action {
  readonly type = LOAD_ORDERS;
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_ORDERS_SUCCESS;

  constructor(public payload: Order[]) {}
}

export class LoadFailedAction implements Action {
  readonly type = LOAD_ORDERS_FAILED;

  constructor(public payload: HttpErrorResponse) {}
}

export type Actions =
  | LoadAction
  | LoadSuccessAction
  | LoadFailedAction
  ;
