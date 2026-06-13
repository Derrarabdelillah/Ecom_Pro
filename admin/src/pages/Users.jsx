import axios from 'axios';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  FiUsers,
  FiShield,
  FiActivity,
  FiBell,
  FiLock,
  FiBarChart2,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiSearch,
  FiFilter,
  FiKey,
  FiMail
} from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Users = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const backendUrl = "https://ecom-pro-0qxb.onrender.com";

  // Fetch users from backend
  const fetchUsers = async () => {
    setLoading(true);
    try {

      const response = await axios.get(`${backendUrl}/api/users/admin`);
      const data = await response.data;
      if (data.success) {
        setUsers(data.admins);
        setFilteredUsers(data.admins);
      } else {
        toast.error('Failed to load users');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [id]);

  // Filter users based on search and role filter
  useEffect(() => {
    let result = users;

    if (searchTerm) {
      result = result.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== 'all') {
      result = result.filter(user => user.role === roleFilter);
    }

    setFilteredUsers(result);
  }, [searchTerm, roleFilter, users]);

  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    role: 'editor'
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!newUser.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (newUser.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!newUser.password) {
      newErrors.password = 'Password is required';
    } else if (newUser.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setFormLoading(true);

    try {
      // Create user via API
      const response = await axios.post(`${backendUrl}/api/users/admin/create`, newUser);
      const data = await response.data;

      if (data.success) {
        toast.success('User created successfully!');

        // Add the new user to the local state
        setUsers([...users, {
          _id: data.admin.id,
          username: data.admin.username,
          role: data.admin.role,
          createdAt: new Date().toISOString().split('T')[0]
        }]);

        // Reset form
        setNewUser({
          username: ' ',
          password: '',
          role: 'editor'
        });

        setShowCreateForm(false);
      } else {
        toast.error(data.message || 'Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Failed to create user. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      // In a real app, you would call your API to delete the user
      // await fetch(`/api/users/admin/${id}`, { method: 'DELETE' });

      // For demo purposes, we'll just remove from local state
      setUsers(users.filter(user => user._id !== id));
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'Administrator': return 'bg-red-100 text-red-800';
      case 'Editor': return 'bg-blue-100 text-blue-800';
      case 'Confirmateur': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-main to-indigo-600 p-8 rounded-2xl shadow-lg text-white mb-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin User Management</h1>
              <span className="max-w-md text-gray-200">
                Manage admin users, roles, and permissions for your application
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateForm(true)}
              className="bg-white text-main px-6 py-3 rounded-lg font-semibold flex items-center gap-2 cursor-pointer"
            >
              <FiPlus /> Add New Admin
            </motion.button>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-grow max-w-md">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search admin users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <FiFilter className="text-gray-500" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main"
                >
                  <option value="all">All Roles</option>
                  <option value="Administrator">Administrator</option>
                  <option value="editor">Editor</option>
                  <option value="Confirmateur">Confirmateur</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* User Creation Form Modal */}
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCreateForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Admin User</h2>

              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <div className="relative">
                    <FiKey className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="username"
                      value={newUser.username}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-main`}
                      placeholder="Enter username"
                    />
                  </div>
                  {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      value={newUser.password}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-main`}
                      placeholder="Enter password"
                    />
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    name="role"
                    value={newUser.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
                  >
                    <option value="Editor">Editor</option>
                    <option value="Confirmateur">Confirmateur</option>
                    <option value="Administrator">Administrator</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="flex-1 bg-main text-white py-2 rounded-lg font-medium hover:bg-main-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {formLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      'Create User'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main"></div>
              <p className="mt-4 text-gray-600">Loading users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-12 text-center">
              <FiUsers className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-700">No admin users found</h3>
              <p className="text-gray-500 mt-1">
                {searchTerm || roleFilter !== 'all'
                  ? 'Try changing your search or filter criteria'
                  : 'Get started by creating your first admin user'
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{user.username}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getRoleBadgeClass(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.createdAt.split('T')[0]}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Users;