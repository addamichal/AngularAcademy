import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromUsers from '../reducers';
import * as users from '../actions/users';

@Component({
  selector: 'app-users-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent {
  users$: Observable<User[]>;

  constructor(private store: Store<fromUsers.State>) {
    this.users$ = store.select(fromUsers.getUsers);
  }
}
