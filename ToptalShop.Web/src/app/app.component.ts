import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as products from './product-list/actions/products';
import * as fromRoot from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.dispatch(new products.LoadProductsAction());
    console.log('RELOAD!!!');
  }

}
