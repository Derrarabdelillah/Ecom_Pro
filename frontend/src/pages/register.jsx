
import { useState } from "react";
import { motion } from "framer-motion";
import { createUser } from "../api/api";
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import Alert from "../components/Alert";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${backendUrl}/api/users`, user);
      if (response.data.succes) {
        setAlert({
          type: 'success',
          message: 'Registration successful! Redirecting to login...'
        });

        setTimeout(() => {
          setAlert(null);
          navigate('/login');
        }, 3000);
      } else {
        setAlert({
          type: 'error',
          message: 'Please fill all fields correctly'
        });
      }
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Registration failed. Please try again.'
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
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
            <p className="text-gray-600">Join our community today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all"
                  placeholder="Full Name"
                  required
                />
              </div>

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
              <div></div> {/* Empty div for spacing */}
              <Link to="/login" className="text-sm font-medium text-main hover:text-indigo-700 transition-colors">
                Already have an account? Login
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
                'Creating account...'
              ) : (
                <>
                  Sign Up <FiArrowRight className="ml-2" />
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;