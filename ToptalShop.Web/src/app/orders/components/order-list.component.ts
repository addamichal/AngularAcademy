import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromOrders from '../reducers';
import * as orders from '../actions/orders';

@Component({
  selector: 'app-orders-list',
  templateUrl: './order-list.component.html'
})
export class OrderListComponent {
  orders$: Observable<Order[]>;

  constructor(private store: Store<fromOrders.State>) {
    this.orders$ = store.select(fromOrders.getOrders);
  }
}
