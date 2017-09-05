import { Action } from '@ngrx/store';
import { User, SaveUserData } from '../models/user';
import { HttpErrorResponse } from '@angular/common/http';

export const SAVE_USER = '[User] Save User';
export const SAVE_USER_RESET = '[User] Save User Reset';
export const SAVE_USER_SUCCESS = '[User] Save User Success';
export const SAVE_USER_FAILURE = '[User] Save User Failure';
export const DELETE_USER = '[User] Delete User';
export const DELETE_USER_SUCCESS = '[User] Delete User Success';
export const DELETE_USER_FAILURE = '[User] Delete User Failure';

export class SaveUser implements Action {
  readonly type = SAVE_USER;

  constructor(public payload: SaveUserData) { }
}

export class SaveUserReset implements Action {
  readonly type = SAVE_USER_RESET;
}

export class SaveUserSuccess implements Action {
  readonly type = SAVE_USER_SUCCESS;

  constructor() { }
}

export class DeleteUser implements Action {
  readonly type = SAVE_USER;

  constructor(public payload: string) { }
}

export class SaveUserFailure implements Action {
  readonly type = SAVE_USER_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

export class DeleteUserSuccess implements Action {
  readonly type = SAVE_USER_SUCCESS;

  constructor() { }
}

export class DeleteUserFailure implements Action {
  readonly type = SAVE_USER_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

export type Actions =
  | SaveUser
  | DeleteUser
  | DeleteUserSuccess
  | DeleteUserFailure
  | SaveUserSuccess
  | SaveUserFailure
  | SaveUserReset
  ;
