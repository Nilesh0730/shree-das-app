import { BusinessCategory, BusinessType, Ownership,BusinessPlace } from "./business-type.enum";

export interface IBusinessDetails {
  currentBusiness: string;
  businessName: string;
  businessAddress: string;
  businessGstNo: string;
  businessDuration: number;
  businessTypeName: string;
  ownership: string;
  businessCategory: string;
  businessPlace: string;
  subBusiness: string;
  businessCapital: IBusinessCapital;
}

export interface IBusinessCapital {
  capitalInvestment: number;
  monthlyExpenses: number;
  rollingInvestment: number;
  avgProfitPercentage: number;
}
export { BusinessType, Ownership, BusinessCategory, BusinessPlace};

