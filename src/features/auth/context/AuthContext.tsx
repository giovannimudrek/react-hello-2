import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { authService, AuthServiceError } from '../services/authService';
import { AuthContextValue, User } from '../types/auth.types';

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const { token: storedToken, user: storedUser } =
      authService.getStoredSession();
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      const response = await authService.login(email, password);
      setToken(response.token);
      setUser(response.user);
    },
    []
  );

  const register = useCallback(
    async (name: string, email: string, password: string): Promise<void> => {
      const response = await authService.register(name, email, password);
      setToken(response.token);
      setUser(response.user);
    },
    []
  );

  const logout = useCallback((): void => {
    authService.logout();
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, token, isLoading, login, register, logout }),
    [user, token, isLoading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}

export { AuthServiceError };
