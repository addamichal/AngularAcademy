import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromProducts from '../reducers';
import * as products from '../actions/products';
import 'rxjs/add/operator/filter';

@Injectable()
export class ProductsLoadedGuard implements CanActivate {
  constructor(private store: Store<fromProducts.State>) {
  }

  canActivate(): Observable<boolean> {
    this.store.dispatch(new products.LoadAction());
    return (this.store.select(fromProducts.getProductsLoaded)
      .filter(loaded => loaded))
      .take(1).switchMap((data) => {
        console.log(data);
        return Observable.of(data);
      });
  }
}
