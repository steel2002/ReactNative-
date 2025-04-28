export interface User {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}