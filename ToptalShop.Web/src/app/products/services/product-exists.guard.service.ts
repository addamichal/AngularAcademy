import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromProducts from '../reducers';
import * as products from '../actions/products';
import 'rxjs/add/operator/filter';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Injectable()
export class ProductExistGuard implements CanActivate {
  constructor(private store: Store<fromProducts.State>, private toasterService: ToasterService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return (this.store.select(fromProducts.getProductsLoaded)
    .filter(loaded => loaded))
    .take(1)
    .switchMap((data) => {
      return this.store.select(fromProducts.getProducts)
      .map(
        products => {
          console.log(products);
          const filteredProducts = products.filter(product => product.id === +route.params['id']);
          console.log(filteredProducts);
          return filteredProducts.length > 0;
        })
      .do(productExists => {
        if (!productExists) {
          this.toasterService.pop('warning', 'Product not found');
          this.router.navigateByUrl('/');
        }
      });
    });
  }
}
