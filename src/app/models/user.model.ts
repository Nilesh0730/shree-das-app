export interface UserRegistration {
  fullName: string;
  email: string;
  mobile: string;
  username: string;
  password?: string;
  role: 'Admin' | 'DataEntry'; // Restricts to specific roles
}
