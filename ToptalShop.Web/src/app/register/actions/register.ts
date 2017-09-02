import { Action } from '@ngrx/store';
import { RegistrationInfo } from '../models/registration-info';
import { HttpErrorResponse } from '@angular/common/http';

export const REGISTER = '[Register] Register';
export const REGISTER_SUCCESS = '[Register] Register Success';
export const REGISTER_FAILURE = '[Register] Register Failure';


export class Register implements Action {
  readonly type = REGISTER;

  constructor(public payload: RegistrationInfo) { }
}

export class RegisterSuccess implements Action {
  readonly type = REGISTER_SUCCESS;

  constructor() { }
}

export class RegisterFailure implements Action {
  readonly type = REGISTER_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

export type Actions =
  | Register
  | RegisterSuccess
  | RegisterFailure;
