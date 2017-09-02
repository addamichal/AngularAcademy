import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src';
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
    console.log('can activate?');
    this.store.dispatch(new products.LoadProductsAction());
    return this.store.select(fromRoot.getProductsLoaded)
      .filter(loaded => loaded)
      .do(() => { console.log('can activate finished?'); })
      .take(1);
  }
}
