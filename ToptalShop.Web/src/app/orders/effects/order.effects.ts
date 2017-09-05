import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as order from '../actions/order';
import { OrderService } from '../services/order.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderEffects {
  @Effect()
  updateOrder$ = this.actions$
    .ofType(order.SAVE_ORDER)
    .map((action: order.SaveOrder) => action.payload)
    .exhaustMap(r =>
      this.orderService.updateOrder(r)
        .map(response => new order.SaveOrderSuccess())
        .catch(error => {
          return Observable.of(new order.SaveOrderFailure(error));
        })
    );

  @Effect()
  deleteOrder$ = this.actions$
    .ofType(order.DELETE_ORDER)
    .map((action: order.DeleteOrder) => action.payload)
    .exhaustMap(r =>
      this.orderService.deleteOrder(r)
        .map(response => new order.DeleteOrderSuccess())
        .catch(error => {
          return Observable.of(new order.DeleteOrderFailure(error));
        })
    );

  constructor(private actions$: Actions, private orderService: OrderService) { }
}
