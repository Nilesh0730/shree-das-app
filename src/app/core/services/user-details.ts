import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IUserDetails } from '../../models/user-details.model';
import { IBusinessProblems } from '../../models/business-problems.model';
import { IBusinessDetails } from '../../models/business-details.model';
import { environment } from '../../../environments/environment';
import { IBaithakLocation } from '../../models/baithak-location.model';
import { IBaithakDay } from '../../models/baithak-day.model';
import { UserRegistration } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserDetailsService {

  private baseUrl = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUserDetails[]> {
    return this.http.get<IUserDetails[]>(`${this.baseUrl}/all`);
  }

  getUserDetails(userId: string): Observable<IUserDetails> {
    return this.http.get<IUserDetails>(`${this.baseUrl}/details/${userId}`);
  }

  getBusinessDetails(userId: number): Observable<IBusinessDetails> {
    return this.http.get<IBusinessDetails>(
      `${this.baseUrl}/businessdetails/${userId}`
    );
  }

  getBusinessProblems(userId: number): Observable<IBusinessProblems> {
    return this.http.get<IBusinessProblems>(
      `${this.baseUrl}/businessproblems/${userId}`
    );
  }

  updateBusinessProblems(userId: number, payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addbusinessproblems/${userId}`, payload);
  }

  UpdateBusinessDetails(userId: number, payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addbusinessdetails/${userId}`, payload);
  }

  addBusinessDetails(payload: any) {
    return this.http.post(
      `${this.baseUrl}/addbusinessdetails`,
      payload
    );
  }

  getBaithakByGender(genderFlag: any) {
    return this.http.get<IBaithakLocation[]>(
      `${this.baseUrl}/baithakNames/${genderFlag}`
    );
  }

  getBaithakDay(baithakLocationId: number, genderFlag: string) {
    return this.http.get<IBaithakDay[]>(
      `${this.baseUrl}/baithakdays/${baithakLocationId}/${genderFlag}`
    );
  }

  getLookup() {
    return this.http.get(`${this.baseUrl}/lookup`);
  }

  insertUpdateUser(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/insertupdate`, payload);
  }

  deleteUser(userId: string | number): Observable<any> {
    return this.http.put(`${this.baseUrl}/delete/${userId}`, null);
  }

  registerUser(userData: UserRegistration): Observable<any> {
    return this.http.post<any>('http://localhost:5082/api/User/registeruser', userData);
  }

  getAllRegisterUsers(): Observable<UserRegistration[]> {
    return this.http.get<UserRegistration[]>('http://localhost:5082/api/User/getregisteruser');
  }
}
