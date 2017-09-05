import { Action } from '@ngrx/store';
import { User } from '../models/user';

export const LOAD_USERS = '[Users] Load Users';
export const LOAD_USERS_SUCCESS = '[Users] Load Users Success';
export const LOAD_USERS_FAILED = '[Users] Load Users Failed';

import { HttpErrorResponse } from '@angular/common/http';

export class LoadAction implements Action {
  readonly type = LOAD_USERS;
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_USERS_SUCCESS;

  constructor(public payload: User[]) {}
}

export class LoadFailedAction implements Action {
  readonly type = LOAD_USERS_FAILED;

  constructor(public payload: HttpErrorResponse) {}
}

export type Actions =
  | LoadAction
  | LoadSuccessAction
  | LoadFailedAction
  ;
