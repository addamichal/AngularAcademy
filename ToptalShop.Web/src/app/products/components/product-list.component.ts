import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromProducts from '../../reducers';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {
  products$: Observable<Product[]>;

  constructor(private store: Store<fromProducts.State>) {
    this.products$ = store.select(fromProducts.getProducts);
  }
}
