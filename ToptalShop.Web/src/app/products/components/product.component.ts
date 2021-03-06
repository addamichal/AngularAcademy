import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as product from '../actions/product';
import * as fromRoot from '../../reducers';
import * as fromProducts from '../reducers';
import * as fromLogin from '../../login/reducers';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators, FormGroup, FormControlName } from '@angular/forms';
import { passwordMatcher } from '../../core/validators';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GenericValidator } from '../../core/generic-validator';
import { catchBadRequest } from '../../core/utils';
import { Product } from '../../catalog/models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit, OnDestroy {
  genericValidator: GenericValidator;
  id: string;
  active = true;
  product: Product;
  form: FormGroup;

  formErrors = {
  };

  validationMessages = {
    name: {
      required: 'Name is required'
    },
    description: {
      required: 'Description is required'
    },
    price: {
      required: 'Price is required',
      min: 'Minimal price is $0.1'
    }
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private toasterService: ToasterService
  ) {
    this.store.dispatch(new product.SaveProductReset());

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.store.select(fromRoot.getProducts)
        .takeWhile(() => this.active)
        .map(products => products.filter(p => p.id === +this.id)[0])
        .subscribe(product => {
          this.form = this.createForm(product);
          this.genericValidator.registerValidation(this.form, this.formErrors);
        });
    });

    this.store.select(fromProducts.getProductPagePending)
      .takeWhile(() => this.active)
      .subscribe(pending => pending ? this.form.disable() : this.form.enable());

    this.store.select(fromProducts.getProductPageSuccess)
      .takeWhile(() => this.active)
      .subscribe((success) => {
        if (success) {
          const message = this.isUpdate() ? 'Product updated' : 'Product created';
          this.toasterService.pop('success', message);
          this.router.navigateByUrl('/products');
        }
      });

    this.store.select(fromProducts.getProductPageError)
      .takeWhile(() => this.active)
      .subscribe(error => catchBadRequest(error, this.formErrors));

    this.store.select(fromProducts.getProductPageDeleteError)
      .takeWhile(() => this.active)
      .subscribe(error => catchBadRequest(error, this.formErrors));

    this.store.select(fromProducts.getProductPageDeleteSuccess)
      .takeWhile(() => this.active)
      .subscribe(success => {
        if (success) {
          this.toasterService.pop('success', 'Product successfully deleted');
          this.router.navigateByUrl('/products');
        }
      });
  }

  submit() {
    const model = Object.assign({ id: this.id }, this.form.value);
    this.store.dispatch(new product.SaveProduct(model));
  }

  delete() {
    this.store.dispatch(new product.DeleteProduct(this.id));
  }

  ngOnDestroy() {
    this.active = false;
    this.store.dispatch(new product.SaveProductReset());
  }

  isUpdate() {
    return !!this.id;
  }

  createForm(product: Product) {
    return this.fb.group({
      name: [product ? product.name : '', [Validators.required]],
      description: [product ? product.description : '', [Validators.required]],
      price: [product ? product.price : 10, [Validators.required, Validators.min(0.01)]]
    });
  }

}
