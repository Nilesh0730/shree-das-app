export interface UserRegistration {
  userId: number;
  fullName: string;
  email: string;
  mobile: string;
  username: string;
  password?: string;
  isActive: boolean;
  role: 'Admin' | 'DataEntry';
}
