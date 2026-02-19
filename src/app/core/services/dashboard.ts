import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { OwnershipData, BusinessTypeData, AgeData, DifficultyData, TotalStats } from '../../models/dashboard.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private baseUrl = `${environment.apiBaseUrl}/users`;
  private filterSource = new BehaviorSubject<any>(null);
  currentFilter = this.filterSource.asObservable();

  constructor(private http: HttpClient) { }

  setFilter(filterParams: any) {
    this.filterSource.next(filterParams);
  }

  getTotalCounts(): Observable<TotalStats> {
    return this.http.get<TotalStats>(`${this.baseUrl}/totals`);
  }

  getOwnership(): Observable<OwnershipData[]> {
    return this.http.get<OwnershipData[]>(`${this.baseUrl}/ownership/gender-count`);
  }

  getBusinessType(): Observable<BusinessTypeData[]> {
    return this.http.get<BusinessTypeData[]>(`${this.baseUrl}/business-type/gender-count`);
  }

  getAge(): Observable<AgeData[]> {
    return this.http.get<AgeData[]>(`${this.baseUrl}/age/gender-count`);
  }

  getDifficulty(): Observable<DifficultyData[]> {
    return this.http.get<DifficultyData[]>(`${this.baseUrl}/business-problems/gender-count`);
  }
}
