// export interface IUserDetails {
//   userId: string;
//   userName: string;
//   mobile: string;
//   userAddress: string;
//   pinCode: string;
//   emailId: string;
//   age: number;
//   birthDate: string;
//   gender: string;
//   aadhaar: string;
//   pan: string;
//   userBaithakNo: number;
//   userBaithakName: string;
//   userBaithakDay: string;
//   baithak: string;
//   baithakRollNo: string;
//   baithakDay: string;
//   email: string;
//   education: string;
//   pincode: string;
// }

export interface IUserDetails {
  userId: string;
  userName: string;
  mobile: string;
  userAddress: string;
  pinCode: string;
  emailId: string;
  age: number;
  birthDate: string; // ISO string
  gender: string;
  aadhaar: string;
  pan: string;
  userBaithakNo: number;
  userBaithakLocationId: number;
  userBaithakName: string;
  userBaithakDayId: number;
  userBaithakDay: string;
  userBaithakTimeId: number;
  userBaithakTime: string;
}
