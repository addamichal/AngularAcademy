import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoginTokenService } from '../login/services/login-token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private loginTokenService: LoginTokenService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.loginTokenService.tokenExists()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.loginTokenService.getUserToken()}`
        }
      });
    }

    return next.handle(request);
  }

}
