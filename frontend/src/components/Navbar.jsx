import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { User, Settings, LogOut, Users, Home } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">UO</span>
            </div>
            <span className="font-semibold text-gray-900 hidden sm:block">
              User Onboarding
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/login')
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/register')
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  Register
                </Link>
                <Link
                  to="/admin/login"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/admin/login')
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  Admin
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/')
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  <Home size={16} />
                  <span className="hidden sm:block">Home</span>
                </Link>

                <Link
                  to="/profile"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/profile')
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  <User size={16} />
                  <span className="hidden sm:block">Profile</span>
                </Link>

                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/admin/dashboard')
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:text-primary-600'
                    }`}
                  >
                    <Users size={16} />
                    <span className="hidden sm:block">Dashboard</span>
                  </Link>
                )}

                {/* User Menu */}
                <div className="flex items-center space-x-3">
                  <div className="hidden md:block">
                    <span className="text-sm text-gray-700">
                      Hi, {user?.firstName}
                    </span>
                    {user?.status && (
                      <span className={`ml-2 ${user.status === 'APPROVED' ? 'status-approved' : user.status === 'PENDING' ? 'status-pending' : 'status-rejected'}`}>
                        {user.status}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    <span className="hidden sm:block">Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;