import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

interface ProtectedRouteProps {
  component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component
}) => {
  const isAuthenticated = getCookie('accessToken'); // Замените на реальную логику авторизации

  return isAuthenticated ? <Component /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
