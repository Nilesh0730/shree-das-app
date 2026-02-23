import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { IUserDetails, IUserDetailsResponse } from '../../models/user-details.model';
import { IBusinessProblems } from '../../models/business-problems.model';
import { IBusinessDetails } from '../../models/business-details.model';
import { environment } from '../../../environments/environment';
import { IBaithakLocation } from '../../models/baithak-location.model';
import { IBaithakDay } from '../../models/baithak-day.model';
import { UserRegistration } from '../../models/user.model';

export type CategoryType =
  | 'OWNERSHIP'
  | 'BUSINESS TYPE'
  | 'BUSINESS PROBLEM'
  | 'AGE RANGE';

@Injectable({ providedIn: 'root' })
export class UserDetailsService {

  private baseUrl = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUserDetails[]> {
    return this.http.get<IUserDetails[]>(`${this.baseUrl}/all`);
  }

  // getUsersByParameters(
  //   categoryType: CategoryType,
  //   categoryId?: number,
  //   gender?: string
  // ): Observable<IUserDetails[]> {

  //   let params = new HttpParams()
  //     .set('categoryType', categoryType);

  //   if (categoryId !== null && categoryId !== undefined) {
  //     params = params.set('categoryId', categoryId.toString());
  //   }

  //   if (gender !== null && gender !== undefined) {
  //     params = params.set('gender', gender);
  //   }

  //   return this.http.get<IUserDetails[]>(`${this.baseUrl}/dashboard/drilldown`, { params });
  // }

getUsersByParameters(filterParams?: any): Observable<IUserDetails[]> {

  let params = new HttpParams()
    .set('categoryType', filterParams.categoryType);

  if (filterParams.categoryId != null) {
    params = params.set('categoryId', filterParams.categoryId.toString());
  }

  if (filterParams.gender != null) {
    params = params.set('gender', filterParams.gender);
  }

  return this.http
    .get<IUserDetailsResponse>(`${this.baseUrl}/dashboard/drilldown`, { params })
    .pipe(
      map(response => response.users)
    );
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
    return this.http.post<any>('https://internal-forms-submission-api-fzedabapg3d7hqdq.centralindia-01.azurewebsites.net/api/users/registeruser', userData);
  }

  getAllRegisterUsers(): Observable<UserRegistration[]> {
    return this.http.get<UserRegistration[]>('https://internal-forms-submission-api-fzedabapg3d7hqdq.centralindia-01.azurewebsites.net/api/users/getregisteruser');
  }
}
