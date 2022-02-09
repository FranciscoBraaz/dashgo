import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';

export const ProtectRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  if (typeof window !== 'undefined') {
    if (isLoading && !isAuthenticated && window.location.pathname !== '/') {
      return <h1>Carregando</h1>;
    }

    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }

    return children;
  }

  return null;
};
