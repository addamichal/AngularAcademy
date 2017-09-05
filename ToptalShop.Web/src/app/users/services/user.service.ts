import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User, SaveUserData } from '../models/User';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  private url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.userUrl;
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url);
  }

  updateUser(user: SaveUserData) {
    if (user.id) {
      const updateUrl = `${this.url}/${user.id}`;
      return this.httpClient.put<SaveUserData>(updateUrl, user);
    }
    return this.httpClient.post<SaveUserData>(this.url, user);
  }

  deleteUser(id: string) {
    const deleteUrl = `${this.url}/${id}`;
    return this.httpClient.delete(deleteUrl);
  }
}
