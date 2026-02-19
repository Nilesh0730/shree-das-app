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

  getOwnershipStats(): Observable<OwnershipData[]> {
    //   const mockData: OwnershipData[] = [
    //     { id: 1, "ownershipType": "वैयक्तिक मालकी", "female": 100, "male": 250 },
    //     { id: 2, "ownershipType": "खाजगी मर्यादित कंपनी", "female": 400, "male": 200 },
    //     { id: 3, "ownershipType": "मर्यादित दायीत्व भागीदारी", "female": 50, "male": 50 },
    //     { id: 4, "ownershipType": "भागीदारी", "female": 300, "male": 350 }
    //   ];

    //  return of(mockData);
    return this.http.get<OwnershipData[]>(`${this.baseUrl}/ownership/gender-count`);
  }

  getBusinessTypeStats(): Observable<BusinessTypeData[]> {

    // const mockData = [
    //   { id: 1, businessType: 'सर्विस', female: 100, male: 250 },
    //   { id: 2, businessType: 'ट्रेडिंग', female: 300, male: 350 },
    //   { id: 3, businessType: 'उत्पादक', female: 300, male: 100 },
    //   { id: 4, businessType: 'घाऊक व्यवसाय', female: 50, male: 50 },
    //   { id: 5, businessType: 'किरकोळ (घरून)', female: 100, male: 100 },
    //   { id: 6, businessType: 'किरकोळ (दुकान)', female: 100, male: 100 }
    // ];
    // return of(mockData);
    return this.http.get<BusinessTypeData[]>(`${this.baseUrl}/business-type/gender-count`);
  }

  getAgeStats(): Observable<AgeData[]> {

    // const ageData = [
    //   { id: 1, ageRange: '१८ ते ३५', female: 100, male: 250 },
    //   { id: 2, ageRange: '३६ ते ४६', female: 300, male: 350 },
    //   { id: 3, ageRange: '४७ ते ५६', female: 400, male: 200 },
    //   { id: 4, ageRange: '५७+', female: 50, male: 50 }
    // ];
    // return of(ageData);
    return this.http.get<AgeData[]>(`${this.baseUrl}/age/gender-count`);
  }

  getDifficultyStats(): Observable<DifficultyData[]> {

    // const difficultyData = [
    //   { id: 1, difficulty: 'Financial Management', female: 100, male: 250 },
    //   { id: 2, difficulty: 'Marketing Management', female: 300, male: 350 },
    //   { id: 3, difficulty: 'Tax & Licences', female: 300, male: 100 },
    //   { id: 4, difficulty: 'Business Development', female: 50, male: 50 }
    // ];
    // return of(difficultyData);
    return this.http.get<DifficultyData[]>(`${this.baseUrl}/business-problems/gender-count`);
  }
}
