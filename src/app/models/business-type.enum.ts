// export enum BusinessType {
//   Service = 'Service',
//   Trading = 'Trading',
//   Manufacture = 'Manufacture',
//   Wholesale = 'Wholesale',
//   RetailGhar = 'RetailGhar',
//   RetailShop = 'RetailShop'
// }


// export enum Ownership {
//   Proprietorship = 'Proprietorship',
//   PvtLtd = 'Private Limited Company',
//   LLP = 'LLP - Limited Liability Partnership',
//   Partnership = 'Partnership'
// }

// export enum BusinessPlace {
//   Gaon = 'Gaon',
//   Shahar = 'City',
//   Bazaar = 'Bazaar',
//   Ghar = 'Ghar',
//   Phirta = 'Phirta',//phirta buiness
//   Itar = 'Itar'
// }

// export enum BusinessCategory {
//   PartTime = 'Part Time',
//   FullTime = 'Full Time'
// }


export enum Ownership {
  Proprietorship = 1,
  PvtLtd = 2,
  LLP = 3,
  Partnership = 4
}

// Optional: Map ID to display name
export const OwnershipNames: Record<Ownership, string> = {
  [Ownership.Proprietorship]: 'Proprietorship',
  [Ownership.PvtLtd]: 'Private Limited Company',
  [Ownership.LLP]: 'LLP - Limited Liability Partnership',
  [Ownership.Partnership]: 'Partnership'
};


// Numeric IDs for each business type
export enum BusinessType {
  Service = 1,
  Trading = 2,
  Manufacture = 3,
  Wholesale = 4,
  RetailGhar = 5,
  RetailShop = 6
}

// Map IDs to display names
export const BusinessTypeNames: Record<BusinessType, string> = {
  [BusinessType.Service]: 'Service',
  [BusinessType.Trading]: 'Trading',
  [BusinessType.Manufacture]: 'Manufacture',
  [BusinessType.Wholesale]: 'Wholesale',
  [BusinessType.RetailGhar]: 'Retail Home',
  [BusinessType.RetailShop]: 'Retail Shop'
};


// Numeric IDs for each business place
export enum BusinessPlace {
  Gaon = 1,
  City = 2,
  Bazaar = 3,
  Home = 4,
  Phirta = 5,
  Itar = 6
}

// Map IDs to display-friendly names
export const BusinessPlaceNames: Record<BusinessPlace, string> = {
  [BusinessPlace.Gaon]: 'Gaon',
  [BusinessPlace.City]: 'City',
  [BusinessPlace.Bazaar]: 'Bazaar',
  [BusinessPlace.Home]: 'Home',
  [BusinessPlace.Phirta]: 'Phirta', // Mobile/On-the-go business
  [BusinessPlace.Itar]: 'Itar'
};


// Numeric IDs for business category
export enum BusinessCategory {
  partTime = 1,
  fullTime = 2
}

// Map IDs to display-friendly names
export const BusinessCategoryNames: Record<BusinessCategory, string> = {
  [BusinessCategory.partTime]: 'Part Time',
  [BusinessCategory.fullTime]: 'Full Time'
};
