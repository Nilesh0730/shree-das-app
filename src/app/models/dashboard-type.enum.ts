
export enum AgeGroup {
  EIGHTEENTOTHIRTYFIVE = 1,
  THIRTYSIXTOFORTYSIX = 2,
  FORTYSIXTOFIFTYSIX = 3,
  FIFTYSEVENPLUS = 4
}

export const AgeGroupMap: Record<string, AgeGroup> = {
  '18 to 35': AgeGroup.EIGHTEENTOTHIRTYFIVE,
  '36 to 46': AgeGroup.THIRTYSIXTOFORTYSIX,
  '46 to 56': AgeGroup.FORTYSIXTOFIFTYSIX,
  '57+': AgeGroup.FIFTYSEVENPLUS
};
