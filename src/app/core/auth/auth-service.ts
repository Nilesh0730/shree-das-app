import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'authToken';
  private userKey = 'app_user'; // Key used for role-based data

  login(username: string, password: string): boolean {
    // 1. Mock Authentication Logic
    let user = null;

    if (username === 'admin' && password === 'admin') {
      user = { username: 'admin', role: 'Admin', id: '1' };
    } else if (username === 'user' && password === 'user') {
      user = { username: 'user', role: 'DataEntry', id: '2' };
    }

    // 2. Save both token and user object if login is successful
    if (user) {
      localStorage.setItem(this.tokenKey, 'dummy-token');
      localStorage.setItem(this.userKey, JSON.stringify(user));
      return true;
    }

    return false;
  }

  getUserRole(): string | null {
    const user = localStorage.getItem(this.userKey);
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        return parsedUser.role; // Correctly returns 'Admin' or 'DataEntry'
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  isLoggedIn(): boolean {
    // Check if both the token and the user data exist
    return !!localStorage.getItem(this.tokenKey) && !!localStorage.getItem(this.userKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }
}
