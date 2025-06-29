// types/AuthContextType.ts
import { User } from './User';

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
}
