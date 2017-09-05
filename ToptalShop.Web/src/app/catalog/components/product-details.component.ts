import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models';
import * as products from '../actions/products';
import * as fromRoot from '../../reducers';
import { Store } from '@ngrx/store';
import { ToasterService } from 'angular2-toaster/angular2-toaster';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  active = true;
  product: Product;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      const id = +data['id'];
      this.store.select(fromRoot.getProducts)
        .takeWhile(() => this.active)
        .map(products => products.filter(p => p.id === id)[0])
        .subscribe(product => this.product = product);
    });
  }

  ngOnDestroy() {
    this.active = false;
  }

  addProductToCart() {
    this.store.dispatch(new products.AddProductToCart(this.product.id, 1));
  }
}
