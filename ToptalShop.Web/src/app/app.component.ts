import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as products from './product-list/actions/products';
import * as fromRoot from './reducers';
import * as fromLogin from './login/reducers';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  loggedIn$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.loggedIn$ = this.store.select(fromLogin.getLoggedIn);
  }
}
