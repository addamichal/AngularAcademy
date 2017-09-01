import { Action } from '@ngrx/store';
import { User, Authenticate } from '../models/user';

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';
export const LOGIN_REDIRECT = '[Auth] Login Redirect';
export const TOKEN_SUCCESS = '[Auth] Token Success';
export const TOKEN_ERROR = '[Auth] Token Error';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: Authenticate) {}
}

export class TokenSuccess implements Action {
  readonly type = TOKEN_SUCCESS;

  constructor(public payload: string) { }
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: { user: User }) {}
}

export class LoginFailure implements Action {
  readonly type = LOGIN_FAILURE;

  constructor(public payload: any) {
    console.log(payload);
  }
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
