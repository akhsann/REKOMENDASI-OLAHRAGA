export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  role?: 'user' | 'admin';
}

export interface AuthResponse {
  user: User;
  token: string;
}

