// components/PublicRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute = ({ children }: PublicRouteProps): JSX.Element => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // If user is already logged in, redirect to previous page or home
  if (isAuthenticated) {
    const redirectPath = location.state?.from?.pathname || '/';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default PublicRoute;
