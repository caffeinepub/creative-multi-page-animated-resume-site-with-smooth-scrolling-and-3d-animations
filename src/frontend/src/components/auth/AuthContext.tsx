import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';

interface AuthContextValue {
  isMainUser: boolean;
  isAuthenticated: boolean;
  mainUserPrincipal: string | null;
  setAsMainUser: () => void;
  clearMainUser: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const MAIN_USER_KEY = 'portfolio_main_user_principal';

export function AuthProvider({ children }: { children: ReactNode }) {
  const { identity } = useInternetIdentity();
  const [mainUserPrincipal, setMainUserPrincipal] = useState<string | null>(() => {
    return localStorage.getItem(MAIN_USER_KEY);
  });

  const currentPrincipal = identity?.getPrincipal().toString();
  const isAuthenticated = !!currentPrincipal && currentPrincipal !== '2vxsx-fae';
  const isMainUser = isAuthenticated && currentPrincipal === mainUserPrincipal;

  const setAsMainUser = () => {
    if (currentPrincipal && currentPrincipal !== '2vxsx-fae') {
      localStorage.setItem(MAIN_USER_KEY, currentPrincipal);
      setMainUserPrincipal(currentPrincipal);
    }
  };

  const clearMainUser = () => {
    localStorage.removeItem(MAIN_USER_KEY);
    setMainUserPrincipal(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isMainUser,
        isAuthenticated,
        mainUserPrincipal,
        setAsMainUser,
        clearMainUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
