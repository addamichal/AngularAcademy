import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User, Authenticate } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { _throw } from 'rxjs/observable/throw';
import { HttpClient } from '@angular/common/http';
import { Token } from '../models/token';

@Injectable()
export class LoginService {
  private _url: string = environment.loginUrl;

  constructor(private httpClient: HttpClient) {}

  login({ email, password }: Authenticate): Observable<Token> {
    const body = 'username=' + email + '&password=' + password + '&grant_type=password';
    const result = this.httpClient.post<any>(this._url, body);
    return result;
  }

  private extractData(res: Response): string {
    const body = res.json();
    return body.access_token || { };
  }

  private handleError(error: any) {
    console.log(error);
    return _throw(error);
  }

  logout() {
    return of(true);
  }
}
