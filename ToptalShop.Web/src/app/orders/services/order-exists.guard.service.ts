import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromOrders from '../reducers';
import * as orders from '../actions/orders';
import 'rxjs/add/operator/filter';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Injectable()
export class OrderExistGuard implements CanActivate {
  constructor(private store: Store<fromOrders.State>, private toasterService: ToasterService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return (this.store.select(fromOrders.getOrdersLoaded)
    .filter(loaded => loaded))
    .take(1)
    .switchMap((data) => {
      return this.store.select(fromOrders.getOrders)
      .map(
        orders => {
          console.log(orders);
          const filteredOrders = orders.filter(order => order.id === +route.params['id']);
          console.log(filteredOrders);
          return filteredOrders.length > 0;
        })
      .do(orderExists => {
        if (!orderExists) {
          this.toasterService.pop('warning', 'Order not found');
          this.router.navigateByUrl('/');
        }
      });
    });
  }
}
