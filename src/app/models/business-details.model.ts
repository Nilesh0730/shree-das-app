export interface IBusinessDetails {
  id?: string;
  businessName: string;
  currentBusiness: string;
  address: string;
  gst: string;
  businessDuration: string;
  years: number;
  half_time: boolean;
  full_time: boolean;

  sub_business: string;
  ownership: Ownership;
  category: Category;
  location: Location;
  capitalInvestment: number;
  workingCapital: number;
  monthlyExpenses: number;
  rollingInvestment: number;
  averageProfit: number; // percentage (0–100)

}

export interface BusinessCategory {
  half_time: boolean;
  full_time: boolean;
}

export interface Location {
  gaon: boolean;
  shahar: boolean;
  bazaar: boolean;
  ghar: boolean;
  phirta: boolean;
  itar: boolean;
}

export interface Category {
  service: boolean;
  trading: boolean;
  manufacture: boolean;
  wholesale: boolean;
  retail: Retail;
}

export interface Retail {
  ghar: boolean;
  shop: boolean;
}

export interface Ownership {
  proprietorship: boolean;
  pvt_ltd: boolean;
  llp: boolean;
  partnership: boolean;
}
