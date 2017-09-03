import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromProfile from '../reducers';
import * as fromLogin from '../../login/reducers';
import * as profilePage from '../actions/profile';
import * as login from '../../login/actions/login';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Profile } from '../models/profile';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { Address } from '../../login/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  active = true;

  form: FormGroup;

  formErrors = {
  };

  validationMessages = {

  };

  constructor(
    private fb: FormBuilder,
    private store: Store<fromProfile.State>, private toasterService: ToasterService) {
  }

  ngOnInit() {
    this.store.select(fromLogin.getUser).subscribe((user) => {
      this.form = this.fb.group({
        email: [user.email],
        password: [null],
        confirmPassword: [null],
        shippingAddress: this.buildFormAddress(user.shippingAddress),
        billingAddress: this.buildFormAddress(user.billingAddress)
      });
    });

    this.store.select(fromProfile.getProfilePagePending)
      .takeWhile(() => this.active)
      .subscribe(pending => pending ? this.form.disable : this.form.enable());

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
      .subscribe(error => this.catchBadRequest(error, this.formErrors));
  }

  ngOnDestroy() {
    this.store.dispatch(new profilePage.UpdateProfileReset());
    this.active = false;
  }

  submit() {
    const profile = <Profile>Object.assign({}, this.form.value);
    this.store.dispatch(new profilePage.UpdateProfile(profile));
  }


  // TODO refactor away
  catchBadRequest(errorResponse: HttpErrorResponse, formErrors: any): Observable<any> {
    this.formErrors[''] = '';
    if (errorResponse && errorResponse.status === 400) {
      const modelState = errorResponse.error.modelState;
      for (const field of Object.keys(modelState)) {
        if (formErrors.hasOwnProperty(field)) {
          formErrors[field] = modelState[field].slice(0, 1);
        } else {
          formErrors[''] = modelState[field].join(' ');
        }
      }
      return Observable.of();
    }
  }

  buildFormAddress(address: Address) {
    return this.fb.group({
      firstName: [address ? address.firstName : ''],
      lastName: [address ? address.firstName : ''],
      address1: [address ? address.address1 : ''],
      address2: [address ? address.address2 : ''],
      city: [address ? address.city : ''],
      state: [address ? address.state : ''],
      zip: [address ? address.zip : '']
    });
  }
}
