// Supported user roles
export type UserRole = 'owner' | 'admin' | 'staff';

// Registration request payload
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  companyName: string;
}

// Authenticated user data
export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationId: string;
}

// Successful registration response
export interface RegisterResponse {
  success: true;
  message: string;
  data: User;
}
