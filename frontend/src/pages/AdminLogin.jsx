import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';
import { authAPI } from '../api/auth.js';

function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: 'admin@example.com', // Pre-fill for convenience
    password: 'admin123'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      
      // Check if user is admin
      if (response.data.user.role !== 'admin') {
        setError('Access denied. Admin privileges required.');
        return;
      }

      login(response.data.user, response.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <div className="text-center mb-8">
        <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mb-4">
          <Shield className="h-6 w-6 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Admin Portal</h2>
        <p className="text-gray-600">Sign in to admin dashboard</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Admin Email
          </label>
          <div className="mt-1 relative">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder="admin@example.com"
            />
            <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1 relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder="••••••••"
            />
            <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Shield className="h-4 w-4 mr-2" />
            {loading ? 'Signing in...' : 'Sign in to Admin Portal'}
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Not an admin?{' '}
            <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
              User login here
            </Link>
          </p>
        </div>
      </form>

      {/* Development Note */}
      <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-md">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Development Credentials:</h4>
        <div className="text-xs text-gray-600 space-y-1">
          <p><strong>Email:</strong> admin@example.com</p>
          <p><strong>Password:</strong> admin123</p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;