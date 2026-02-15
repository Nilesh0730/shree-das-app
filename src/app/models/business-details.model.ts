import { BusinessCategory, BusinessType, Ownership,BusinessPlace } from "./business-type.enum";

export interface IBusinessDetails {
  currentBusiness: string;
  businessName: string;
  businessAddress: string;
  businessGstNo: string;
  businessDuration: number;
  businessTypeId:number;
  businessTypeName: string;
  businessOwnershipId : number;
  ownership: string;
  businessCategoryId :number;
  businessCategory: string;
  businessPlaceId: number;
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

