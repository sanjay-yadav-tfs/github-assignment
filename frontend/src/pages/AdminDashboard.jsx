import React, { useState, useEffect } from 'react';
import { Shield, Users, UserCheck, UserX, Search, RefreshCw } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';
import { usersAPI } from '../api/users.js';
import PendingUsersTable from '../components/PendingUsersTable.jsx';

function AdminDashboard() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await usersAPI.getAllUsers();
      setUsers(response.data);
      
      // Calculate stats
      const newStats = response.data.reduce((acc, user) => {
        acc.total++;
        if (user.status === 'pending') acc.pending++;
        else if (user.status === 'approved') acc.approved++;
        else if (user.status === 'rejected') acc.rejected++;
        return acc;
      }, { total: 0, pending: 0, approved: 0, rejected: 0 });
      
      setStats(newStats);
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUserStatusChange = async (userId, newStatus) => {
    try {
      await usersAPI.updateUserStatus(userId, newStatus);
      // Refresh the users list
      await fetchUsers();
    } catch (err) {
      setError(`Failed to update user status: ${err.response?.data?.message || err.message}`);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const StatCard = ({ title, value, icon: Icon, color, bgColor }) => (
    <div className={`${bgColor} rounded-lg shadow p-6`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className={`h-8 w-8 ${color}`} />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="text-lg font-medium text-gray-900">{value}</dd>
          </dl>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="animate-pulse">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded w-48"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.firstName}!</p>
            </div>
          </div>
          <button
            onClick={fetchUsers}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.total}
          icon={Users}
          color="text-blue-600"
          bgColor="bg-blue-50"
        />
        <StatCard
          title="Pending Approval"
          value={stats.pending}
          icon={UserCheck}
          color="text-yellow-600"
          bgColor="bg-yellow-50"
        />
        <StatCard
          title="Approved Users"
          value={stats.approved}
          icon={UserCheck}
          color="text-green-600"
          bgColor="bg-green-50"
        />
        <StatCard
          title="Rejected Users"
          value={stats.rejected}
          icon={UserX}
          color="text-red-600"
          bgColor="bg-red-50"
        />
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Users
            </label>
            <div className="relative">
              <input
                id="search"
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
          
          <div className="w-full sm:w-48">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="all">All Users</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            User Management ({filteredUsers.length} users)
          </h3>
        </div>
        
        {filteredUsers.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            {searchTerm || statusFilter !== 'all' ? 'No users match your filters.' : 'No users found.'}
          </div>
        ) : (
          <PendingUsersTable 
            users={filteredUsers} 
            onStatusChange={handleUserStatusChange}
            showAllUsers={true}
          />
        )}
      </div>

      {/* Quick Actions for Pending Users */}
      {stats.pending > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-center">
            <UserCheck className="h-6 w-6 text-yellow-600 mr-3" />
            <div>
              <h3 className="text-lg font-medium text-yellow-800">
                {stats.pending} User{stats.pending !== 1 ? 's' : ''} Awaiting Approval
              </h3>
              <p className="text-yellow-700 mt-1">
                Review and approve/reject pending user registrations to grant system access.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;