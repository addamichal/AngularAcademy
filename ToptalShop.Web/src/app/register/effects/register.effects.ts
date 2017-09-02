import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as register from '../actions/register';
import { RegistrationService } from '../services/registration.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegisterEffects {
  @Effect()
  register$ = this.actions$
    .ofType(register.REGISTER)
    .map((action: register.Register) => action.payload)
    .exhaustMap(r =>
      this.registrationService
        .register(r)
        .map(response => new register.RegisterSuccess())
        .catch(error => {
          return Observable.of(new register.RegisterFailure(error));
        })
    );

  constructor(private actions$: Actions, private registrationService: RegistrationService) { }
}
