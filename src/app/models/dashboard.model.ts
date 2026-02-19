export interface GenderStats {
  id: number,
  female: number;
  male: number;
}

export interface OwnershipData extends GenderStats {
  ownershipName: string;
}

export interface BusinessTypeData extends GenderStats {
  businessType: string;
}

export interface AgeData extends GenderStats {
  ageRange: string;
}

export interface DifficultyData extends GenderStats {
  difficulty: string;
}

export interface TotalStats {
  totalFemale: number;
  totalMale: number;
}
