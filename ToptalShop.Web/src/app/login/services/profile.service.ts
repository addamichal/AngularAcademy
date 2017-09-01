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

    constructor(private httpClient: HttpClient) { }

    getProfile(): Observable<User> {
      return this.httpClient.get<User>(this.url);
    }
}
