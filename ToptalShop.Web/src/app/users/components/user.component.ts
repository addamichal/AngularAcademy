import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, SaveUserData } from '../models/user';
import * as user from '../actions/user';
import * as fromUsers from '../reducers';
import * as fromLogin from '../../login/reducers';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { passwordMatcher } from '../../core/validators';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchBadRequest } from '../../core/utils';
import { GenericValidator } from '../../core/generic-validator';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit, OnDestroy {
  genericValidator: GenericValidator;
  currentUser$: Observable<any>;
  id: string;
  active = true;
  user: User;
  form: FormGroup;

  formErrors = {
  };

  validationMessages = {
    form: {
      match: 'Passwords must match'
    },
    email: {
      required: 'Please enter Email',
      email: 'Please enter Valid Email'
    },
    password: {
      required: 'Please enter Password',
      minlength: 'Password must have at least 6 characters'
    },
    confirmPassword: {
      required: 'Please repeat Password'
    },
    passwordGroup: {
      match: 'Passwords must match'
    }
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromUsers.State>,
    private toasterService: ToasterService
  ) {
    this.store.dispatch(new user.SaveUserReset());
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {
    this.currentUser$ = this.store.select(fromLogin.getUser);

    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.store.select(fromUsers.getUsers)
        .takeWhile(() => this.active)
        .map(users => users.filter(p => p.id === this.id)[0])
        .subscribe(user => {
          this.form = this.createForm(user);
          this.genericValidator.registerValidation(this.form, this.formErrors);
        });
    });

    this.store.select(fromUsers.getUserPagePending)
      .takeWhile(() => this.active)
      .subscribe(pending => pending ? this.form.disable() : this.form.enable());

    this.store.select(fromUsers.getUserPageSuccess)
      .takeWhile(() => this.active)
      .subscribe((success) => {
        if (success) {
          const message = this.isUpdate() ? 'User updated' : 'User created';
          this.toasterService.pop('success', message);
          this.router.navigateByUrl('/users');
        }
      });

    this.store.select(fromUsers.getUserPageError)
      .takeWhile(() => this.active)
      .subscribe(error => catchBadRequest(error, this.formErrors));

    this.store.select(fromUsers.getUserPageDeleteError)
      .takeWhile(() => this.active)
      .subscribe(error => catchBadRequest(error, this.formErrors));

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
    const model = <SaveUserData>{
      id: this.id,
      email: this.form.value.email,
      password: this.form.value.passwordGroup.password,
      confirmPassword: this.form.value.passwordGroup.confirmPassword,
      userRole: this.form.value.userRole
    };
    this.store.dispatch(new user.SaveUser(model));
  }

  delete() {
    this.store.dispatch(new user.DeleteUser(this.id));
  }

  ngOnDestroy() {
    this.active = false;
    this.store.dispatch(new user.SaveUserReset());
  }

  isUpdate() {
    return !!this.id;
  }

  createForm(user: User) {
    const form = this.fb.group({
      email: [user ? user.email : '', [Validators.required, Validators.email]],
      userRole: [user ? user.userRole : 'RegularUser', [Validators.required]],
      passwordGroup: this.fb.group({
        password: [null, [Validators.minLength(6)]],
        confirmPassword: [null]
      }, { validator: passwordMatcher })
    });

    if (!this.isUpdate()) {
      const passwordGroup = form.get('passwordGroup');
      passwordGroup.get('password').setValidators([Validators.required, Validators.minLength(6)]);
      passwordGroup.get('confirmPassword').setValidators(Validators.required);
    }

    return form;
  }
}
