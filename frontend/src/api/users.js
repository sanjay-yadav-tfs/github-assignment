import api from './index.js';

export const usersAPI = {
  // Get pending users (Admin only)
  getPendingUsers: async () => {
    const response = await api.get('/users/pending');
    return response.data;
  },

  // Get approved users (Admin only)
  getApprovedUsers: async () => {
    const response = await api.get('/users/approved');
    return response.data;
  },

  // Get user by ID
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Approve or reject user (Admin only)
  approveRejectUser: async (id, action, rejectionReason = null) => {
    const response = await api.post(`/users/${id}/approve-reject`, {
      action,
      rejectionReason,
    });
    return response.data;
  },

  // Get user profile
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data; // This returns the full response, UserProfile.jsx will access response.data.user
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },

  // Search users (Admin only)
  searchUsers: async (query, filters = {}) => {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    const response = await api.get(`/users/search?${params.toString()}`);
    return response.data;
  },

  // Get user statistics (Admin only)
  getUserStats: async () => {
    const response = await api.get('/users/stats');
    return response.data;
  },

  // Delete user (Admin only)
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};