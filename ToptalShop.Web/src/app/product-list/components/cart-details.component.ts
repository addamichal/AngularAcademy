import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartDetails } from '../models';
import * as fromRoot from '../../reducers';
import * as fromLogin from '../../login/reducers';
import * as product from '../actions/products';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
declare var paypal: any;

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit, OnDestroy {
  active = true;
  cartDetails: CartDetails;
  loggedIn$: Observable<boolean>;
  hasFinishedProfile$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>, private httpClient: HttpClient) { }

  ngOnInit() {
    this.loggedIn$ = this.store.select(fromLogin.getLoggedIn);
    this.hasFinishedProfile$ = this.store.select(fromLogin.getHasFinishedProfile);

    this.store.select(fromRoot.getCartDetails)
      .takeWhile(() => this.active)
      .subscribe(data => this.cartDetails = data);

    paypal.Button.render({
      env: 'sandbox',
      commit: true,
      payment: () => this.payment().then((data) => data.id),
      onAuthorize: (data) => this.onAuthorize(data).then(() => {
        console.log('great success!');
      })
    }, '#paypal-button');
  }

  payment() {
    return this.httpClient.post<any>(environment.paypalPaymentUrl, this.cartDetails.lines).toPromise();
  }

  onAuthorize(data) {
    return this.httpClient.post<any>(environment.paypalPaymentExecuteUrl, data).toPromise();
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
