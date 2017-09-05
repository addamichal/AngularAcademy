import { Action } from '@ngrx/store';
import { Order, UpdateOrderStatus } from '../models/order';
import { HttpErrorResponse } from '@angular/common/http';

export const SAVE_ORDER = '[Order] Save Order';
export const SAVE_ORDER_RESET = '[Order] Save Order Reset';
export const SAVE_ORDER_SUCCESS = '[Order] Save Order Success';
export const SAVE_ORDER_FAILURE = '[Order] Save Order Failure';
export const DELETE_ORDER = '[Order] Delete Order';
export const DELETE_ORDER_SUCCESS = '[Order] Delete Order Success';
export const DELETE_ORDER_FAILURE = '[Order] Delete Order Failure';

export class SaveOrderReset implements Action {
  readonly type = SAVE_ORDER_RESET;
}

export class SaveOrder implements Action {
  readonly type = SAVE_ORDER;

  constructor(public payload: UpdateOrderStatus) { }
}

export class SaveOrderSuccess implements Action {
  readonly type = SAVE_ORDER_SUCCESS;

  constructor() { }
}

export class SaveOrderFailure implements Action {
  readonly type = SAVE_ORDER_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

export class DeleteOrder implements Action {
  readonly type = DELETE_ORDER;

  constructor(public payload: number) { }
}

export class DeleteOrderSuccess implements Action {
  readonly type = DELETE_ORDER_SUCCESS;

  constructor() { }
}

export class DeleteOrderFailure implements Action {
  readonly type = DELETE_ORDER_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

export type Actions =
  | SaveOrder
  | DeleteOrder
  | DeleteOrderSuccess
  | DeleteOrderFailure
  | SaveOrderSuccess
  | SaveOrderFailure
  | SaveOrderReset
  ;
