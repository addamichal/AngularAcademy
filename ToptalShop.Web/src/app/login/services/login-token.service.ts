import { Injectable } from '@angular/core';

@Injectable()
export class LoginTokenService {
  _tokenKey = 'id_token';

  tokenExists(): boolean {
    return this.getUserToken() != null;
  }

  getUserToken(): string {
    return localStorage.getItem(this._tokenKey);
  }

  setUserToken(userToken: string) {
    localStorage.setItem(this._tokenKey, userToken);
  }

  removeUserToken(): void {
    localStorage.removeItem(this._tokenKey);
  }
}
