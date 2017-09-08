import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromProfile from '../reducers';
import * as fromLogin from '../../login/reducers';
import * as profilePage from '../actions/profile';
import * as login from '../../login/actions/login';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ToasterService } from 'angular2-toaster';
import { Address, Profile } from '../../login/models';
import { catchBadRequest } from '../../core/utils';
import { GenericValidator } from '../../core/generic-validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  genericValidator: GenericValidator;
  active = true;

  form: FormGroup;

  formErrors = {
    sa: {},
    ba: {}
  };

  validationMessages = {
    email: {
      required: 'Email is required'
    },
    firstName: {
      required: 'First name is required'
    },
    lastName: {
      required: 'Last name is required'
    },
    address1: {
      required: 'Address is required'
    },
    address2: {
      required: 'Address 2 is required'
    },
    city: {
      required: 'City is required'
    },
    state: {
      required: 'State is required'
    },
    zip: {
      required: 'Zip is required'
    }
  };

  constructor(
    private fb: FormBuilder,
    private store: Store<fromProfile.State>, private toasterService: ToasterService) {
      this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {
        this.store.select(fromLogin.getUser)
    .takeWhile(() => this.active)
      .subscribe((user) => {
        if (user) {
          this.form = this.fb.group({
            email: [user.email, Validators.required],
            password: [null],
            confirmPassword: [null],
            shippingAddress: this.buildFormAddress(user.shippingAddress),
            billingAddress: this.buildFormAddress(user.billingAddress)
          });

          const shippingAddress = this.form.get('shippingAddress') as FormGroup;
          const billingAddress = this.form.get('billingAddress') as FormGroup;
          this.genericValidator.registerValidation(this.form, this.formErrors, false);
          this.genericValidator.registerValidation(shippingAddress, this.formErrors.sa, false);
          this.genericValidator.registerValidation(billingAddress, this.formErrors.ba, false);
        }
    });

    this.store.select(fromProfile.getProfilePagePending)
      .takeWhile(() => this.active)
      .subscribe(pending => pending ? this.form.disable() : this.form.enable());

    this.store.select(fromProfile.getProfilePageSuccess)
      .takeWhile(() => this.active)
      .subscribe((success) => {
        if (success) {
          this.toasterService.pop('success', 'Profile updated');
          this.store.dispatch(new login.LoadUser());
        }
      });

    this.store.select(fromProfile.getProfilePageError)
      .takeWhile(() => this.active)
      .subscribe(error => catchBadRequest(error, this.formErrors));
  }

  ngOnDestroy() {
    this.store.dispatch(new profilePage.UpdateProfileReset());
    this.active = false;
  }

  submit() {
    const profile = <Profile>Object.assign({}, this.form.value);
    this.store.dispatch(new profilePage.UpdateProfile(profile));
  }

  copyBillingAddress() {
    this.form.patchValue({
      billingAddress: this.form.value.shippingAddress
    });
  }

  private buildFormAddress(address: Address) {
    return this.fb.group({
      firstName: [address ? address.firstName : '', Validators.required],
      lastName: [address ? address.lastName : '', Validators.required],
      address1: [address ? address.address1 : '', Validators.required],
      address2: [address ? address.address2 : '', Validators.required],
      city: [address ? address.city : '', Validators.required],
      state: [address ? address.state : '', Validators.required],
      zip: [address ? address.zip : '', Validators.required]
    });
  }

}
