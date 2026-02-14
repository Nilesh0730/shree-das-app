import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IUserDetails } from '../../models/user-details.model';
import { IBusinessProblems } from '../../models/business-problems.model';
import { IBusinessDetails } from '../../models/business-details.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserDetailsService {
  private baseUrl = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUserDetails[]> {
    return this.http.get<IUserDetails[]>(`${this.baseUrl}/all`);
  }

  getUserDetails(userId: any): Observable<IUserDetails[]> {
    return this.http.get<IUserDetails[]>(`${this.baseUrl}/details/${userId}`);
  }

  getBusinessDetails(userId: any): Observable<IBusinessDetails[]> {
    return this.http.get<IBusinessDetails[]>(`${this.baseUrl}/businessdetails/${userId}`);
  }

  getBusinessProblems(userId: any): Observable<IBusinessProblems[]> {
    return this.http.get<IBusinessProblems[]>(`${this.baseUrl}/businessproblems/${userId}`);
  }
}
