import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccessTokenService {
  setAccessToken(token: string) {
    localStorage.setItem('token', token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('token');
  }

  removeAccessToken(): void {
    localStorage.removeItem('token');
  }
  getUserRole(): string | null {
    if (this.getAccessToken())
      return JSON.parse(window.atob(this.getAccessToken()!.split('.')[1]))["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    else
      return null;
  }
}