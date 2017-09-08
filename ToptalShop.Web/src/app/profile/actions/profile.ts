import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Profile } from '../../login/models';

export const UPDATE_PROFILE = '[Profile] Update Profile';
export const UPDATE_PROFILE_RESET = '[Profile] Update Profile Reset';
export const UPDATE_PROFILE_SUCCESS = '[Profile] Update Profile Success';
export const UPDATE_PROFILE_FAILURE = '[Profile] Update Profile Failure';

export class UpdateProfile implements Action {
  readonly type = UPDATE_PROFILE;

  constructor(public payload: Profile) { }
}

export class UpdateProfileReset implements Action {
  readonly type = UPDATE_PROFILE_RESET;
}

export class UpdateProfileSuccess implements Action {
  readonly type = UPDATE_PROFILE_SUCCESS;

  constructor() { }
}

export class UpdateProfileFailure implements Action {
  readonly type = UPDATE_PROFILE_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

export type Actions =
  | UpdateProfile
  | UpdateProfileSuccess
  | UpdateProfileFailure
  | UpdateProfileReset
  ;
