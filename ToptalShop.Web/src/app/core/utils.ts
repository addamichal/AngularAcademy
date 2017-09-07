import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

function catchBadRequest(errorResponse: HttpErrorResponse, formErrors: any): Observable<any> {
  this.formErrors[''] = '';
  if (errorResponse && errorResponse.status === 400) {
    if (errorResponse.error.modelState) {
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

    if (errorResponse.error.message) {
      formErrors[''] = errorResponse.error.message;
      return Observable.of();
    }
  }
}

export { catchBadRequest };
