import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginTokenService } from './login-token.service';
import { HttpHeaders } from '@angular/common/http';
import { Profile } from '../../core/models';

@Injectable()
export class ProfileService {
    private url: string = environment.profileUrl;

    constructor(private httpClient: HttpClient) { }

    getProfile(): Observable<Profile> {
      return this.httpClient.get<Profile>(this.url);
    }
}
