import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product-list/models';
import * as products from '../product-list/actions/products';
import * as fromRoot from '../reducers';
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
      console.log(id);
      this.store.select(fromRoot.getProducts)
      .takeWhile(() => this.active)
      .map(
        products => products.filter(p => p.productId === id)[0]
      ).subscribe(product => {
        if (!product) {
          console.log('now!');
          this.toasterService.pop('warning', 'Product not found');
          //this.router.navigateByUrl('/');
        }

        this.product = product;
        console.log(this.product);
      });
    });
  }

  ngOnDestroy() {
    console.log('on destroy');
  }

  addProductToCart() {
    this.store.dispatch(new products.AddProductToCart(this.product.productId, 1));
  }
}
