import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { Users, Shield, CheckCircle, Clock, UserCheck } from 'lucide-react';

const Home = () => {
  const { isAuthenticated, isAdmin, user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          User Onboarding & Approval Platform
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A secure and efficient platform for managing user registrations with admin approval workflows.
        </p>
      </div>

      {/* Status Cards for Authenticated Users */}
      {isAuthenticated && (
        <div className="mb-12">
          <div className="card p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Welcome back, {user?.firstName}!
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-500">Account Status:</span>
                  <span className={user?.status === 'APPROVED' ? 'status-approved' : user?.status === 'PENDING' ? 'status-pending' : 'status-rejected'}>
                    {user?.status}
                  </span>
                </div>
                {user?.status === 'PENDING' && (
                  <p className="text-sm text-amber-600 mt-1">
                    Your account is pending admin approval. We'll notify you once it's processed.
                  </p>
                )}
                {user?.status === 'REJECTED' && (
                  <p className="text-sm text-red-600 mt-1">
                    Your account was rejected. Please contact support for more information.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-8 w-8 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">User Registration</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Secure user registration with email validation and profile management.
          </p>
          {!isAuthenticated && (
            <Link to="/register" className="btn-primary inline-block">
              Register Now
            </Link>
          )}
        </div>

        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-8 w-8 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">Admin Approval</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Comprehensive admin dashboard for managing user approvals and rejections.
          </p>
          {isAdmin && (
            <Link to="/admin/dashboard" className="btn-primary inline-block">
              Go to Dashboard
            </Link>
          )}
        </div>

        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="h-8 w-8 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">Status Tracking</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Real-time status updates and email notifications for approval decisions.
          </p>
          {isAuthenticated && (
            <Link to="/profile" className="btn-primary inline-block">
              View Profile
            </Link>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      {!isAuthenticated && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Started</h2>
          <div className="space-x-4">
            <Link to="/register" className="btn-primary">
              Create Account
            </Link>
            <Link to="/login" className="btn-secondary">
              Sign In
            </Link>
          </div>
          <div className="mt-4">
            <Link
              to="/admin/login"
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Admin Login
            </Link>
          </div>
        </div>
      )}

      {/* Stats Section for Admins */}
      {isAdmin && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Quick Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6 text-center">
              <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900 mb-1">-</h3>
              <p className="text-gray-600">Pending Approvals</p>
            </div>
            <div className="card p-6 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900 mb-1">-</h3>
              <p className="text-gray-600">Approved Users</p>
            </div>
            <div className="card p-6 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900 mb-1">-</h3>
              <p className="text-gray-600">Total Users</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;