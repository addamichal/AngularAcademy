import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { LoginTokenService } from './login-token.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProfileService {
    private url: string = environment.profileUrl;

    constructor(private httpClient: HttpClient, private loginTokenService: LoginTokenService) { }

    getProfile(): Observable<User> {
      // TODO add into middleware logic!
      console.log('here?');
      const options = { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.loginTokenService.getUserToken()) };
      return this.httpClient.get<User>(this.url, options);
    }
}
