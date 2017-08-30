import { Component, OnInit } from '@angular/core';
import { Product } from './models/product';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as products from './actions/products';
import * as fromRoot from '../reducers';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  cart$: Observable<any>;
  cartTotal$: Observable<number>;

  constructor(private store: Store<fromRoot.State>) {
    this.products$ = store.select(fromRoot.getProducts);
    this.cart$ = store.select(fromRoot.getCart);
    this.cartTotal$ = store.select(fromRoot.getCartTotal);
  }

  ngOnInit() {
    this.store.dispatch(new products.LoadProductsAction());
  }

  addProductToCart(product: Product) {
    this.store.dispatch(new products.AddProductToCart(product.productId, 1));
  }
}
