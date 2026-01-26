import { User } from 'firebase/auth';

export interface AuthState {
  user: User | null;
  isInitialized: boolean;
  error: string | null;
}

export interface AuthContextValue extends AuthState {
  signOut: () => Promise<void>;
}
