import { useState } from "react";
import { motion } from "framer-motion";
import { verifyUser } from "../api/api";
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { useCookies } from "react-cookie";

import Alert from "../components/Alert";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await verifyUser(user);
      
      if (response) {
        const token = response.token;
        const user = response.user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        

        setAlert({
          type: 'success',
          message: 'Login successful! Redirecting...'
        });

        setTimeout(() => {
          setAlert(null);
          navigate('/');
        }, 3000);
      } else {
        setAlert({
          type: 'error',
          message: 'Invalid credentials!'
        });
      }
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Login failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 relative">
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all"
                  placeholder="Email Address"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  type="password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all"
                  placeholder="Password"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link to="/forgot-password" className="text-sm text-gray-600 hover:text-main transition-colors">
                Forgot password?
              </Link>
              <Link to="/register" className="text-sm font-medium text-main hover:text-indigo-700 transition-colors">
                Create account
              </Link>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className={`w-full flex items-center justify-center py-3 px-4 rounded-lg bg-gradient-to-r from-main to-indigo-600 text-white font-medium shadow-md hover:shadow-lg transition-all ${isLoading ? 'opacity-70' : ''}`}
            >
              {isLoading ? (
                'Logging in...'
              ) : (
                <>
                  Login <FiArrowRight className="ml-2" />
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;