import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import * as user from '../actions/user';
import * as fromUsers from '../reducers';
import * as fromLogin from '../../login/reducers';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { passwordMatcher } from '../../core/validators';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit, OnDestroy {
  currentUser$: Observable<any>;
  id: string;
  active = true;
  user: User;
  form: FormGroup;

  formErrors = {
  };

  validationMessages = {

  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromUsers.State>,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.currentUser$ = this.store.select(fromLogin.getUser);

    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.store.select(fromUsers.getUsers)
        .takeWhile(() => this.active)
        .map(users => users.filter(p => p.id === this.id)[0])
        .subscribe(user => this.form = this.createForm(user));
    });

    this.store.select(fromUsers.getUserPagePending)
      .takeWhile(() => this.active)
      .subscribe(pending => pending ? this.form.disable : this.form.enable());

    this.store.select(fromUsers.getUserPageSuccess)
      .takeWhile(() => this.active)
      .subscribe((success) => {
        if (success) {
          const message = this.isUpdate() ? 'User updated' : 'User created';
          this.toasterService.pop('success', message);
        }
      });

    this.store.select(fromUsers.getUserPageError)
      .takeWhile(() => this.active)
      .subscribe(error => this.catchBadRequest(error, this.formErrors));

    this.store.select(fromUsers.getUserPageError)
      .takeWhile(() => this.active)
      .subscribe(error => this.catchBadRequest(error, this.formErrors));

    this.store.select(fromUsers.getUserPageDeleteError)
      .takeWhile(() => this.active)
      .subscribe(error => this.catchBadRequest(error, this.formErrors));

    this.store.select(fromUsers.getUserPageDeleteSuccess)
      .takeWhile(() => this.active)
      .subscribe(success => {
        if (success) {
          this.toasterService.pop('success', 'User successfully deleted');
          this.router.navigateByUrl('/users');
        }
      });
  }

  submit() {
    const model = Object.assign({ id: this.id }, this.form.value);
    console.log(model);
    this.store.dispatch(new user.SaveUser(model));
  }

  delete() {
    this.store.dispatch(new user.DeleteUser(this.id));
  }

  ngOnDestroy() {
    this.active = false;
  }

  isUpdate() {
    return !!this.id;
  }

  createForm(user: User) {
    return this.fb.group({
      email: [user ? user.email : '', [Validators.required, Validators.email]],
      userRole: [user ? user.userRole : 'RegularUser', [Validators.required]],
      password: [null, [Validators.minLength(6)]],
      confirmPassword: [null],
    }, { validator: passwordMatcher });

    // TODO add validators
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
}
