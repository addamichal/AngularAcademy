import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpErrorResponse } from '@angular/common/http';
import {ToasterService} from 'angular2-toaster';

@Injectable()
export class ExceptionInterceptor implements HttpInterceptor {
  constructor(private toasterService: ToasterService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const res = next.handle(req)
    .catch((e: HttpErrorResponse) => {
      if (e.status === 404) {
        this.toasterService.pop('warning', 'Not found');
        return Observable.of();
      }

      if (e.status === 0) {
        console.log('handling 0');
        this.toasterService.pop('error', 'API not accessible');
        return Observable.throw(e);
      }

      if (e.status === 500) {
        this.toasterService.pop('error', `Error - ${e.error.exceptionMessage}`);
        return Observable.throw(e);
      }

      return Observable.throw(e);
    });

    return res;
  }
}
