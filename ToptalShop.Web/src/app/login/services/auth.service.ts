import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User, Authenticate } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { _throw } from 'rxjs/observable/throw';

@Injectable()
export class AuthService {
  private _url: string = environment.loginUrl;

  constructor(private http: Http) {}

  login({ username, password }: Authenticate): Observable<string> {
    const body = 'username=' + username + '&password=' + password + '&grant_type=password';
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    const result = this.http.post(this._url, body)
        .map(this.extractData)
        .catch(this.handleError);

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
