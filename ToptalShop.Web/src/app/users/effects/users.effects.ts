import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Effect, Actions} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import * as users from '../actions/users';
import { UserService } from '../services/user.service';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { mapKeys, keys, isObject } from 'lodash';
import { User } from '../models/user';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private userService: UserService) {
  }

  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType(users.LOAD_USERS)
    .switchMap(() =>
    this.userService.getUsers()
      .map((p: User[]) => new users.LoadSuccessAction(p))
      .catch(error => of(new users.LoadFailedAction(error)))
  );
}
