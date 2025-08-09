import { motion } from 'framer-motion';
import { FiUsers, FiShield, FiActivity, FiBell, FiLock, FiBarChart2 } from 'react-icons/fi';

const Users = () => {
  const features = [
    { icon: <FiUsers size={24} />, name: 'User Management', description: 'Manage all customer accounts' },
    { icon: <FiShield size={24} />, name: 'Roles & Permissions', description: 'Control access levels' },
    { icon: <FiActivity size={24} />, name: 'Activity Logs', description: 'Track user actions' },
    { icon: <FiBell size={24} />, name: 'Notifications', description: 'Configure alerts' },
    { icon: <FiLock size={24} />, name: 'Security', description: 'Password and authentication' },
    { icon: <FiBarChart2 size={24} />, name: 'Analytics', description: 'User behavior insights' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className=" w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-main to-indigo-600 p-8 text-center text-white">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10 }}
            className="inline-block mb-4"
          >
            <FiUsers className="inline-block" size={40} />
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">User Management Coming Soon</h1>
          <span className="opacity-90 max-w-md mx-auto text-gray-300">
            Powerful tools to manage your users are on the way
          </span>
        </div>

        {/* Features Grid */}
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-6 rounded-lg border border-gray-100"
              >
                <div className="text-main mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{feature.name}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Notification Form */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-main/10 to-indigo-600/10 rounded-lg p-6 text-center border border-main/20"
          >
            <h3 className="font-medium text-gray-700 mb-3">Get notified when we launch</h3>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-main flex-grow"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-main to-indigo-600 text-white px-6 py-3 rounded-lg hover:shadow-md transition-all"
              >
                Notify Me
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Users;