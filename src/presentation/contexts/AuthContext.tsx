import { createContext, useEffect, useMemo, useState } from "react";
import type { AuthUser, LoginPayload } from "../../domain/entities/AuthUser";
import {
  loginUseCase,
  logoutUseCase,
  getCurrentUserUseCase,
  subscribeToAuthChangesUseCase,
} from "../../di";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authError: string | null;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  clearAuthError: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let unsubscribe = () => {};

    async function loadSession() {
      try {
        const sessionUser = await getCurrentUserUseCase.execute();
        if (active) {
          setUser(sessionUser);
          setAuthError(null);
        }
      } catch (error) {
        if (active) {
          setUser(null);
          setAuthError(error instanceof Error ? error.message : "Nao foi possivel validar a sessao.");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadSession();

    try {
      unsubscribe = subscribeToAuthChangesUseCase.execute((nextUser, errorMessage) => {
        if (!active) {
          return;
        }

        setUser(nextUser);
        setAuthError(errorMessage ?? null);
        setIsLoading(false);
      });
    } catch (error) {
      if (active) {
        setAuthError(error instanceof Error ? error.message : "Nao foi possivel iniciar a escuta da sessao.");
        setIsLoading(false);
      }
    }

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  async function login(payload: LoginPayload) {
    setAuthError(null);
    const sessionUser = await loginUseCase.execute(payload);
    setUser(sessionUser);
  }

  async function logout() {
    await logoutUseCase.execute();
    setUser(null);
    setAuthError(null);
  }

  function clearAuthError() {
    setAuthError(null);
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      authError,
      login,
      logout,
      clearAuthError,
    }),
    [authError, isLoading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

