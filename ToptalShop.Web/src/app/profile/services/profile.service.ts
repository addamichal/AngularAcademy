import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Profile } from '../../core/models';

@Injectable()
export class ProfileService {
  private url: string = environment.profileUrl;

  constructor(private httpClient: HttpClient) {}

  updateProfile(profileInfo: Profile): Observable<any> {
    return this.httpClient.put(this.url, profileInfo);
  }
}
