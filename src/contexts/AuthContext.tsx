import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@/types/auth';
import { loginUser, registerUser, getCurrentUser, logoutUser as storageLogout } from '@/utils/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on mount
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setIsLoading(false);

    // Add Supabase auth listener for multi-device sync
    let unsubscribe: (() => void) | undefined;
    import('@/utils/supabase').then(({ supabase }) => {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_OUT') {
          setUser(null);
        } else if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session?.user) {
          // Update user state from Supabase session (handles multi-tab & token refresh)
          const su = session.user;
          setUser({
            id: su.id,
            name: su.user_metadata?.name || 'User',
            email: su.email || '',
            createdAt: su.created_at,
            role: su.user_metadata?.role || 'user',
          });
        }
      });
      unsubscribe = () => subscription.unsubscribe();
    }).catch(console.error);
    return () => unsubscribe?.();
  }, []);

  const login = async (email: string, password: string) => {
    const loggedInUser = await loginUser(email, password);
    setUser(loggedInUser);
    navigate(loggedInUser.role === 'admin' ? '/admin' : '/');
  };

  const register = async (name: string, email: string, password: string) => {
    const newUser = await registerUser(name, email, password);
    setUser(newUser);
    navigate(newUser.role === 'admin' ? '/admin' : '/');
  };

  const logout = async () => {
    await storageLogout();
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

