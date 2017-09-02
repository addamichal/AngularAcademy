import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RegistrationInfo } from '../models/registration-info';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegistrationService {
  private url: string = environment.profileUrl;

  constructor(private httpClient: HttpClient) {}

  register(registrationInfo: RegistrationInfo): Observable<any> {
    return this.httpClient.post(this.url, registrationInfo);
  }
}
