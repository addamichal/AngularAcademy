import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Effect, Actions} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import * as orders from '../actions/orders';
import { OrderService } from '../services/order.service';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { mapKeys, keys, isObject } from 'lodash';
import { Order } from '../models/order';

@Injectable()
export class OrdersEffects {
  constructor(private actions$: Actions, private orderService: OrderService) {
  }

  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType(orders.LOAD_ORDERS)
    .switchMap(() =>
    this.orderService.getOrders()
      .map((p: Order[]) => new orders.LoadSuccessAction(p))
      .catch(error => of(new orders.LoadFailedAction(error)))
  );
}
