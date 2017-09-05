import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../models/order';
import * as orders from '../actions/orders';
import * as fromOrders from '../reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit, OnDestroy {
  active = true;
  order: Order;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromOrders.State>
  ) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      const id = +data['id'];
      this.store.select(fromOrders.getOrders)
        .takeWhile(() => this.active)
        .map(orders => orders.filter(p => p.id === id)[0])
        .subscribe(order => this.order = order);
    });
  }

  ngOnDestroy() {
    this.active = false;
  }

  delete() {
    console.log('gonna delete this!');
  }
}
