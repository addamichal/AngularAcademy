import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as products from '../actions/products';
import 'rxjs/add/operator/filter';

@Injectable()
export class ProductsLoadedGuard implements CanActivate {
  constructor(private store: Store<fromRoot.State>) {
  }

  canActivate(): Observable<boolean> {
    this.store.dispatch(new products.LoadProductsAction());
    return this.store.select(fromRoot.getProductsLoaded)
      .filter(loaded => loaded)
      .take(1).switchMap((data) => {
        return Observable.of(data);
      });
  }
}
