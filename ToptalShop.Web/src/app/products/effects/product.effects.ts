import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as product from '../actions/product';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductEffects {
  @Effect()
  updateProduct$ = this.actions$
    .ofType(product.SAVE_PRODUCT)
    .map((action: product.SaveProduct) => action.payload)
    .exhaustMap(r =>
      this.productService.updateProduct(r)
        .map(response => new product.SaveProductSuccess())
        .catch(error => {
          return Observable.of(new product.SaveProductFailure(error));
        })
    );

  @Effect()
  deleteProduct$ = this.actions$
    .ofType(product.DELETE_PRODUCT)
    .map((action: product.DeleteProduct) => action.payload)
    .exhaustMap(r =>
      this.productService.deleteProduct(r)
        .map(response => new product.DeleteProductSuccess())
        .catch(error => {
          return Observable.of(new product.DeleteProductFailure(error));
        })
    );

  constructor(private actions$: Actions, private productService: ProductService) { }
}
