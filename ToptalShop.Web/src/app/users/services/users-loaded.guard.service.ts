import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromUsers from '../reducers';
import * as users from '../actions/users';
import 'rxjs/add/operator/filter';

@Injectable()
export class UsersLoadedGuard implements CanActivate {
  constructor(private store: Store<fromUsers.State>) {
  }

  canActivate(): Observable<boolean> {
    this.store.dispatch(new users.LoadAction());
    return (this.store.select(fromUsers.getUsersLoaded)
      .filter(loaded => loaded))
      .take(1).switchMap((data) => {
        return Observable.of(data);
      });
  }
}
