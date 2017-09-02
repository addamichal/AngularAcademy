import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as profile from '../actions/profile';
import { ProfileService } from '../services/profile.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProfileEffects {
  @Effect()
  updateProfile = this.actions$
    .ofType(profile.UPDATE_PROFILE)
    .map((action: profile.UpdateProfile) => action.payload)
    .exhaustMap(r =>
      this.profileService
        .updateProfile(r)
        .map(response => new profile.UpdateProfileSuccess())
        .catch(error => {
          return Observable.of(new profile.UpdateProfileFailure(error));
        })
    );

  constructor(private actions$: Actions, private profileService: ProfileService) { }
}
