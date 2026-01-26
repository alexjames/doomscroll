import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useMemo,
} from 'react';
import {
  onAuthStateChanged,
  signInAnonymously as firebaseSignInAnonymously,
  signOut as firebaseSignOut,
  User,
} from 'firebase/auth';
import { auth } from '@/config/firebase';
import { AuthContextValue } from '@/types/auth';

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        if (firebaseUser) {
          // User is signed in
          setUser(firebaseUser);
          setError(null);
        } else {
          // No user - sign in anonymously
          try {
            await firebaseSignInAnonymously(auth);
            // onAuthStateChanged will fire again with the new user
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Authentication failed');
          }
        }
        setIsInitialized(true);
      },
      (err) => {
        setError(err.message);
        setIsInitialized(true);
      }
    );

    return () => unsubscribe();
  }, []);

  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign out failed');
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isInitialized,
      error,
      signOut,
    }),
    [user, isInitialized, error, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
