import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as user from '../actions/user';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserEffects {
  @Effect()
  updateUser$ = this.actions$
    .ofType(user.SAVE_USER)
    .map((action: user.SaveUser) => action.payload)
    .exhaustMap(r =>
      this.userService.updateUser(r)
        .map(response => new user.SaveUserSuccess())
        .catch(error => {
          return Observable.of(new user.SaveUserFailure(error));
        })
    );

  constructor(private actions$: Actions, private userService: UserService) { }
}
