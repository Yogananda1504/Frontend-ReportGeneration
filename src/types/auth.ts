
// Type declarations used to define the abstract stucture of the variable which we will be defining in the Auth Section  

export type UserRole = 'FACULTY' | 'HOD' | 'DIRECTOR';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}