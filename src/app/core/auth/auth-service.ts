import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'authToken';

  login(username: string, password: string): boolean {
    // Replace with real API call
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem(this.tokenKey, 'dummy-token');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
