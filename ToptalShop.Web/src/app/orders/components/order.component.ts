import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../models/order';
import * as orders from '../actions/orders';
import * as order from '../actions/order';
import * as fromOrders from '../reducers';
import * as fromLogin from '../../login/reducers';
import { Store } from '@ngrx/store';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../login/models/user';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit, OnDestroy {
  id: number;
  active = true;
  order: Order;
  form: FormGroup;

  formErrors = {
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromOrders.State>,
    private toasterService: ToasterService,
    private fb: FormBuilder
  ) {
    this.store.dispatch(new order.SaveOrderReset());
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.id = +data['id'];
      this.store.select(fromOrders.getOrders)
        .takeWhile(() => this.active)
        .map(orders => orders.filter(p => p.id === this.id)[0])
        .subscribe(order => {
          this.order = order;
          this.form = this.createForm(order);
        });
    });

    this.store.select(fromOrders.getOrderPagePending)
      .takeWhile(() => this.active)
      .subscribe(pending => pending ? this.form.disable() : this.form.enable());

    this.store.select(fromOrders.getOrderPageSuccess)
      .takeWhile(() => this.active)
      .subscribe((success) => {
        if (success) {
          const message = 'Order status updated';
          this.toasterService.pop('success', message);
          this.router.navigateByUrl('/orders');
        }
      });

    this.store.select(fromOrders.getOrderPageError)
      .takeWhile(() => this.active)
      .subscribe(error => this.catchBadRequest(error, this.formErrors));

    this.store.select(fromOrders.getOrderPageDeleteError)
      .takeWhile(() => this.active)
      .subscribe(error => this.catchBadRequest(error, this.formErrors));

    this.store.select(fromOrders.getOrderPageDeleteError)
      .takeWhile(() => this.active)
      .subscribe(error => this.catchBadRequest(error, this.formErrors));

    this.store.select(fromOrders.getOrderPageDeleteSuccess)
      .takeWhile(() => this.active)
      .subscribe(success => {
        if (success) {
          this.toasterService.pop('success', 'Order successfully deleted');
          this.router.navigateByUrl('/orders');
        }
      });


  }

  ngOnDestroy() {
    this.active = false;
    this.store.dispatch(new order.SaveOrderReset());
  }

  delete() {
    this.store.dispatch(new order.DeleteOrder(this.id));
  }

  submit() {
    const model = Object.assign({ id: this.id }, this.form.value);
    this.store.dispatch(new order.SaveOrder(model));
  }

  createForm(order: Order) {
    return this.fb.group({
      status: [order.status, [Validators.required]],
    });
  }

  // TODO refactor away
  catchBadRequest(errorResponse: HttpErrorResponse, formErrors: any): Observable<any> {
    this.formErrors[''] = '';
    if (errorResponse && errorResponse.status === 400) {
      if (errorResponse.error.modelState) {
        const modelState = errorResponse.error.modelState;
        for (const field of Object.keys(modelState)) {
          if (formErrors.hasOwnProperty(field)) {
            formErrors[field] = modelState[field].slice(0, 1);
          } else {
            formErrors[''] = modelState[field].join(' ');
          }
        }
        return Observable.of();
      }

      if (errorResponse.error.message) {
        formErrors[''] = errorResponse.error.message;
        return Observable.of();
      }
    }
  }
}
