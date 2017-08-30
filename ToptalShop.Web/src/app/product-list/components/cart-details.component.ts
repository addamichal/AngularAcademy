import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartDetails } from '../models';
import * as fromRoot from '../../reducers';
import * as product from '../actions/products';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit, OnDestroy {
  active = true;
  cartDetails: CartDetails;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.store.select(fromRoot.getCartDetails)
      .takeWhile(() => this.active)
      .subscribe(data => this.cartDetails = data);
  }

  ngOnDestroy() {
    this.active = false;
  }

  removeProductFromCart(productId: number) {
    this.store.dispatch(new product.RemoveProductFromCart(productId));
  }

  changeQuantity(productId: number, quantity: number) {
    if (!quantity || quantity <= 0) {
      this.store.dispatch(new product.RemoveProductFromCart(productId));
    } else {
      this.store.dispatch(new product.ChangeProductQuantity(productId, quantity));
    }
  }
}
