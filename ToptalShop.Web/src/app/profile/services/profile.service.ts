import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../models/profile';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProfileService {
  private url: string = environment.profileUrl;

  constructor(private httpClient: HttpClient) {}

  updateProfile(profileInfo: Profile): Observable<any> {
    return this.httpClient.post(this.url, profileInfo);
  }
}
