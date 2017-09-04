import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromOrders from '../reducers';
import * as orders from '../actions/orders';
import 'rxjs/add/operator/filter';

@Injectable()
export class OrdersLoadedGuard implements CanActivate {
  constructor(private store: Store<fromOrders.State>) {
  }

  canActivate(): Observable<boolean> {
    this.store.dispatch(new orders.LoadAction());
    return (this.store.select(fromOrders.getOrdersLoaded)
      .filter(loaded => loaded))
      .take(1).switchMap((data) => {
        console.log(data);
        return Observable.of(data);
      });
  }
}
