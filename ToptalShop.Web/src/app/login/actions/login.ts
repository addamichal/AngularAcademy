import { Action } from '@ngrx/store';
import { User, Authenticate } from '../models/user';
import { Token } from '../models/token';
import { HttpErrorResponse } from '@angular/common/http';

export const LOGIN = '[Login] Login';
export const LOGOUT = '[Login] Logout';
export const LOGIN_SUCCESS = '[Login] Login Success';
export const LOGIN_FAILURE = '[Login] Login Failure';
export const LOGIN_REDIRECT = '[Login] Login Redirect';
export const TOKEN_SUCCESS = '[Login] Token Success';
export const TOKEN_ERROR = '[Login] Token Error';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: Authenticate) {}
}

export class TokenSuccess implements Action {
  readonly type = TOKEN_SUCCESS;

  constructor(public payload: Token) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: { user: User }) {}
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

export type Actions =
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout;
