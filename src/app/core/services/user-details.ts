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

  // getBusinessProblems(): Observable<IBusinessProblems[]> {
  //   return this.http.get<IBusinessProblems[]>(`${this.baseUrl}/business-problems`);
  // }

  // getBusinessDetails(): Observable<IBusinessDetails[]> {
  //   return this.http.get<IBusinessDetails[]>(`${this.baseUrl}/business-details`);
  // }

  getBusinessProblems(): Observable<IBusinessProblems[]> {
    const data: IBusinessProblems[] =
      [
        {
          "userId": "U001",
          "loanFinancial": "Difficulty getting startup loans",
          "marketing": "Limited reach in local markets",
          "taxLicence": "Delay in obtaining GST license",
          "skill": "",
          "land": "High cost of renting shop space",
          "businessDev": "",
          "employment": "Trouble hiring permanent staff"
        }
      ];

    return of(data);
  }

  getBusinessDetails(): Observable<IBusinessDetails[]> {
    // const data: IBusinessDetails[] = [
    //   {
    //     businessName: "Shree Electronics",
    //     currentBusiness: "Electronics Retail",
    //     address: "12 Market Street, Pune",
    //     gst: "ASPNU8508I",
    //     businessDuration: "3",
    //     years: 3,
    //     half_time: false,
    //     full_time: true,
    //     sub_business: "Mobile Accessories",
    //     Ownership: {
    //       proprietorship: true,
    //       pvt_ltd: false,
    //       llp: false,
    //       partnership: false
    //     },
    //     category: {
    //       service: false,
    //       trading: true,
    //       manufacture: false,
    //       wholesale: false,
    //       retail: { ghar: false, shop: true }
    //     },
    //     location: {
    //       gaon: false,
    //       shahar: true,
    //       bazaar: true,
    //       ghar: false,
    //       phirta: false,
    //       itar: false
    //     },
    //     capitalInvestment: 500000,
    //     workingCapital: 150000,
    //     monthlyExpenses: 80000,
    //     rollingInvestment: 200000,
    //     averageProfit: 25,
    //     id: 'U003'
    //   },
    //   {
    //     businessName: "AgroFresh Farms",
    //     currentBusiness: "Organic Farming",
    //     businessAddress: "Village Road, Nashik",
    //     businessGstNo: "ASPNU8508I",
    //     businessDuration: 8,
    //     yaer: 8,
    //     half_time: true,
    //     full_time: false,
    //     sub_business: "Vegetable Supply",
    //     Ownership: {
    //       proprietorship: false,
    //       pvt_ltd: false,
    //       llp: false,
    //       partnership: true
    //     },
    //     category: {
    //       service: false,
    //       trading: false,
    //       manufacture: false,
    //       wholesale: true,
    //       retail: { ghar: true, shop: false }
    //     },
    //     location: {
    //       gaon: true,
    //       shahar: false,
    //       bazaar: false,
    //       ghar: true,
    //       phirta: false,
    //       itar: false
    //     },
    //     capitalInvestment: 300000,
    //     workingCapital: 120000,
    //     monthlyExpenses: 60000,
    //     rollingInvestment: 100000,
    //     averageProfit: 18,
    //     id: 'U001'
    //   },
    //   {
    //     businessName: "Tech Solutions LLP",
    //     currentBusiness: "IT Services",
    //     address: "Unit 45, Business Park, Mumbai",
    //     gst: "AOSPN8507P",
    //     businessDuration: 2,
    //     years: 2,
    //     half_time: false,
    //     full_time: true,
    //     sub_business: "Cloud Consulting",

    //     Ownership: {
    //       proprietorship: false,
    //       pvt_ltd: false,
    //       llp: true,
    //       partnership: false
    //     },

    //     category: {
    //       service: true,
    //       trading: false,
    //       manufacture: false,
    //       wholesale: false,
    //       retail: { ghar: false, shop: false }
    //     },

    //     location: {
    //       gaon: false,
    //       shahar: true,
    //       bazaar: false,
    //       ghar: false,
    //       phirta: false,
    //       itar: false
    //     },
    //     capitalInvestment: 900000,
    //     workingCapital: 400000,
    //     monthlyExpenses: 250000,
    //     rollingInvestment: 350000,
    //     averageProfit: 40,
    //     id: 'U002'
    //   }
    // ];
    const data: IBusinessDetails[] = [
      {
        "currentBusiness": "Coaching",
        "businessName": "Amit Maths Classes",
        "businessAddress": "Thane West",
        "businessGstNo": "27ABCDE1234F1Z5",
        "businessDuration": 5,
        "businessTypeName": "Service",
        "ownership": "Proprietorship",
        "businessCategory": "Part Time",
        "businessPlace": "City",
        "subBusiness": "SSC / HSC Coaching",
        "businessCapital": {
          "capitalInvestment": 350000,
          "monthlyExpenses": 45000,
          "rollingInvestment": 80000,
          "avgProfitPercentage": 28.5
        }
      }
    ]
    return of(data);
  }
}
