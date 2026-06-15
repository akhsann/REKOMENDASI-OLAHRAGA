import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

// Halaman yang hanya boleh diakses oleh pengguna biasa (bukan admin)
const USER_ONLY_PATHS = ['/', '/profile', '/favorites', '/progress', '/tutorial', '/workout'];

export function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin = user?.role === 'admin';

  // Jika admin mencoba akses halaman pengguna biasa → redirect ke /admin
  if (isAdmin && USER_ONLY_PATHS.includes(location.pathname)) {
    return <Navigate to="/admin" replace />;
  }

  // Jika pengguna biasa mencoba akses halaman admin → redirect ke /
  if (!isAdmin && adminOnly) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
