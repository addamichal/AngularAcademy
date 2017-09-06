import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Effect, Actions} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import * as products from '../actions/products';
import { ProductService } from '../services/product.service';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { mapKeys, keys, isObject } from 'lodash';
import { Product } from '../models/product';
import { ToasterService } from 'angular2-toaster';

@Injectable()
export class ProductsEffects {
  constructor(private actions$: Actions, private productService: ProductService, private toasterService: ToasterService) {
  }

  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType(products.LOAD_PRODUCTS)
    .switchMap(() =>
    this.productService.getProducts()
      .map((p: Product[]) => new products.LoadSuccessAction(p))
      .catch(error => of(new products.LoadFailedAction(error)))
  );

  @Effect({ dispatch: false })
  addToCard: Observable<Action> = this.actions$
    .ofType(products.INCREMENT_PRODUCT_QUANTITY)
    .do(() => this.toasterService.pop('success', 'Added to cart'));
}
