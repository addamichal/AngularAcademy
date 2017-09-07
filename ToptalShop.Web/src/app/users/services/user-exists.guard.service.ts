import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromUsers from '../reducers';
import * as users from '../actions/users';
import 'rxjs/add/operator/filter';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Injectable()
export class UserExistGuard implements CanActivate {
  constructor(private store: Store<fromUsers.State>, private toasterService: ToasterService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return (this.store.select(fromUsers.getUsersLoaded)
    .filter(loaded => loaded))
    .take(1)
    .switchMap((data) => {
      return this.store.select(fromUsers.getUsers)
      .map(
        users => {
          const filteredUsers = users.filter(user => user.id === route.params['id']);
          return filteredUsers.length > 0;
        })
      .do(userExists => {
        if (!userExists) {
          this.toasterService.pop('warning', 'User not found');
          this.router.navigateByUrl('/');
        }
      });
    });
  }
}
