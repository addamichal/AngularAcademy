import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as products from './product-list/actions/products';
import * as fromRoot from './reducers';
import * as fromLogin from './login/reducers';
import { Observable } from 'rxjs/Observable';
declare var paypal: any;

export const CREATE_PAYMENT_URL  = 'http://localhost:5261/api/paypalpayment';
export const EXECUTE_PAYMENT_URL = 'http://localhost:5261/api/paypalpaymentexecute';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  loggedIn$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.loggedIn$ = this.store.select(fromLogin.getLoggedIn);
  }

  ngOnInit() {
    paypal.Button.render({
      env: 'sandbox', // Or 'sandbox'
      commit: true, // Show a 'Pay Now' button
        payment: function() {
          return paypal.request.post(CREATE_PAYMENT_URL).then(function(data) {
          return data.id;
        });
      },

      onAuthorize: function (data) {
        console.log('here!');
        return paypal.request({
          method: 'post',
          url: EXECUTE_PAYMENT_URL,
          json: {
            paymentID: data.paymentID,
            payerID: data.payerID
        }
        }).then(function (response) {
          console.log(response);
        });
      }

    }, '#paypal-button');
  }
}
