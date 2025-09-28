import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

const ProtectedRoute = ({ children, requireAdmin = false, requireApproved = false }) => {
  const { isAuthenticated, isAdmin, isApproved, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    // Redirect to home if not admin
    return <Navigate to="/" replace />;
  }

  if (requireApproved && !isApproved && !isAdmin) {
    // Redirect to profile if not approved (except for admins)
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default ProtectedRoute;