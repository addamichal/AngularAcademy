import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CartSummary } from '../models/cart-summary';
import 'rxjs/add/operator/takeWhile';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-cart-summary',
  template: `
<button routerLink="/cart" class="btn btn-outline-success my-2 my-sm-0" [disabled]="!(anyItems$ | async)">
  <span *ngIf="anyItems$ | async">
    Cart ({{ (cartSummary$ | async).totalItems }}) {{ (cartSummary$ | async).totalPrice | currency:"USD":true }}
  </span>
  <span *ngIf="!(anyItems$ | async)">Cart is empty</span>
</button>
`
})
export class CartSummaryComponent implements OnInit, OnDestroy {
  private alive = true;
  anyItems$: Observable<boolean>;
  cartSummary$: Observable<CartSummary>;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.cartSummary$ = this.store.select(fromRoot.getCartSummary).takeWhile(() => this.alive);
    this.anyItems$ = this.cartSummary$.map(s => s.totalItems > 0);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
