import { Action } from '@ngrx/store';
import { Profile, Authenticate } from '../models';
import { Token } from '../models/token';
import { HttpErrorResponse } from '@angular/common/http';

export const LOGIN = '[Login] Login';
export const LOGIN_RESET = '[Login] Reset';
export const LOGOUT = '[Login] Logout';
export const LOGIN_SUCCESS = '[Login] Login Success';
export const LOGIN_FAILURE = '[Login] Login Failure';
export const LOGIN_REDIRECT = '[Login] Login Redirect';
export const LOAD_USER = '[Login] Token Success';
export const TOKEN_ERROR = '[Login] Token Error';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: Authenticate) {}
}

export class LoadUser implements Action {
  readonly type = LOAD_USER;

  constructor() {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: { user: Profile }) {}
}

export class LoginFailure implements Action {
  readonly type = LOGIN_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

export class LoginRedirect implements Action {
  readonly type = LOGIN_REDIRECT;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginReset implements Action {
  readonly type = LOGIN_RESET;
}

export type Actions =
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | LoginReset
  | Logout;
