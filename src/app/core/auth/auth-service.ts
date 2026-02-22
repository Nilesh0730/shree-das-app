// import { Injectable } from '@angular/core';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private tokenKey = 'authToken';
//   private userKey = 'app_user'; // Key used for role-based data

//   login(username: string, password: string): boolean {
//     // 1. Mock Authentication Logic
//     let user = null;

//     if (username === 'admin' && password === 'admin') {
//       user = { username: 'admin', role: 'Admin', id: '1' };
//     } else if (username === 'user' && password === 'user') {
//       user = { username: 'user', role: 'DataEntry', id: '2' };
//     }

//     // 2. Save both token and user object if login is successful
//     if (user) {
//       localStorage.setItem(this.tokenKey, 'dummy-token');
//       localStorage.setItem(this.userKey, JSON.stringify(user));
//       return true;
//     }

//     return false;
//   }

//   getUserRole(): string | null {
//     const user = localStorage.getItem(this.userKey);
//     if (user) {
//       try {
//         const parsedUser = JSON.parse(user);
//         return parsedUser.role; // Correctly returns 'Admin' or 'DataEntry'
//       } catch (e) {
//         return null;
//       }
//     }
//     return null;
//   }

//   isLoggedIn(): boolean {
//     // Check if both the token and the user data exist
//     return !!localStorage.getItem(this.tokenKey) && !!localStorage.getItem(this.userKey);
//   }

//   logout(): void {
//     localStorage.removeItem(this.tokenKey);
//     localStorage.removeItem(this.userKey);
//   }
// }

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, tap } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private apiUrl = 'http://localhost:5082/api/User/login'; // तुमचा API URL
//   private tokenKey = 'authToken';
//   private userKey = 'app_user';

//   constructor(private http: HttpClient) {}

//   // १. खऱ्या API कडून डेटा मिळवण्यासाठी लॉगिन फंक्शन
//   login(credentials: any, password: any): Observable<any> {
//     return this.http.post<any>(this.apiUrl, credentials).pipe(
//       tap((res) => {
//         // API कडून Token, Role आणि Username मिळेल
//         if (res && res.token) {
//           localStorage.setItem(this.tokenKey, res.token);

//           // युजरचा रोल आणि नाव एका ऑब्जेक्टमध्ये सेव्ह करा
//           const userDetails = {
//             username: res.username,
//             role: res.role
//           };
//           localStorage.setItem(this.userKey, JSON.stringify(userDetails));
//         }
//       })
//     );
//   }

//   // २. रोल मिळवण्यासाठी पद्धत (Role-based UI साठी)
//   getUserRole(): string | null {
//     const user = localStorage.getItem(this.userKey);
//     if (user) {
//       try {
//         const parsedUser = JSON.parse(user);
//         return parsedUser.role; // 'Admin' किंवा 'DataEntry' रिटर्न करेल
//       } catch (e) {
//         return null;
//       }
//     }
//     return null;
//   }

//   // ३. लॉगिन आहे की नाही हे तपासण्यासाठी
//   isLoggedIn(): boolean {
//     return !!localStorage.getItem(this.tokenKey);
//   }

//   // ४. बॅकएंडला पाठवण्यासाठी टोकन मिळवा
//   getToken(): string | null {
//     return localStorage.getItem(this.tokenKey);
//   }

//   // ५. लॉगआउट
//   logout(): void {
//     localStorage.removeItem(this.tokenKey);
//     localStorage.removeItem(this.userKey);
//   }
// }


import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://internal-forms-submission-api-fzedabapg3d7hqdq.centralindia-01.azurewebsites.net/api/users/login';
  private tokenKey = 'authToken';
  private userKey = 'app_user';

  private authStatus = new BehaviorSubject<boolean>(this.isLoggedIn());
  authStatus$ = this.authStatus.asObservable();

  private http = inject(HttpClient);

  constructor() { }

  login(loginData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, loginData).pipe(
      tap((res) => {
        if (res && res.token) {
          localStorage.setItem(this.tokenKey, res.token);
          const userDetails = {
            username: res.username,
            role: res.role
          };
          localStorage.setItem(this.userKey, JSON.stringify(userDetails));
          this.authStatus.next(true);
        }
      })
    );
  }


  getUserRole(): string | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user).role : null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.authStatus.next(false);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    // JWT is divided into 3 parts by dots. The middle part [1] is the payload.
    const payload = JSON.parse(atob(token.split('.')[1]));

    if (!payload.exp) return false;

    const expirationDate = payload.exp * 1000; // convert to milliseconds
    return Date.now() >= expirationDate;
  }
}
