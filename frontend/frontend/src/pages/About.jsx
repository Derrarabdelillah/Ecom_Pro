import { motion } from 'framer-motion';
import { FiClock, FiShoppingBag, FiLayers, FiPieChart, FiUsers, FiTruck, FiDollarSign, FiSettings, FiMail, FiArrowRight } from 'react-icons/fi';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: <FiSettings size={24} />,
      name: 'Admin Dashboard',
      description: 'Complete control panel with real-time business metrics'
    },
    {
      icon: <FiShoppingBag size={24} />,
      name: 'Product Management',
      description: 'Add, edit, and organize inventory with bulk actions'
    },
    {
      icon: <FiLayers size={24} />,
      name: 'Stock Control',
      description: 'Automated inventory tracking with low-stock alerts'
    },
    {
      icon: <FiUsers size={24} />,
      name: 'Order Processing',
      description: 'Manage orders, returns, and customer communications'
    },
    {
      icon: <FiTruck size={24} />,
      name: 'Shipping System',
      description: 'Integrated carriers with automatic label generation'
    },
    {
      icon: <FiDollarSign size={24} />,
      name: 'Financial Reports',
      description: 'Sales analytics, tax calculations, and P&L statements'
    },
    {
      icon: <FiPieChart size={24} />,
      name: 'Business Analytics',
      description: 'Customizable dashboards with conversion tracking'
    },
    {
      icon: <FiUsers size={24} />,
      name: 'Team Management',
      description: 'Role-based permissions and staff performance tracking'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-main to-indigo-600 p-8 text-center text-white relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white"></div>
            <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-white"></div>
          </div>

          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10 }}
            className="inline-block mb-4"
          >
            <FiClock className="inline-block" size={40} />
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">Ecom Pro Platform Coming Soon</h1>
          <span className="opacity-90 max-w-2xl mx-auto text-gray-200">
            We're building the ultimate e-commerce management system with powerful automation and AI-driven insights
          </span>
        </div>

        {/* Features Section */}
        <div className="p-8 md:p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Complete E-commerce Solution</h2>
          <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
            Everything you need to manage your online business efficiently
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                className="bg-white p-6 rounded-lg border border-gray-100 hover:border-main/30 transition-all"
              >
                <div className="text-main mb-3 bg-main/10 w-12 h-12 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.name}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-main/5 to-indigo-600/5 rounded-xl p-8 text-center border border-main/10"
          >
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Get Early Access</h3>
              <p className="text-gray-600 mb-6">
                Be the first to experience our powerful e-commerce management platform
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your business email"
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-main flex-grow text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-main to-indigo-600 text-white px-6 py-3 rounded-lg hover:shadow-md transition-all flex items-center justify-center gap-2 text-sm font-medium"
                >
                  Request Access <FiArrowRight />
                </motion.button>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Footer with Social Links */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
          <div className="flex flex-col items-center">
            {/* Social Links */}
            <motion.div
              className="flex gap-4 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.a
                href="https://web.facebook.com/Abdou.Dr.0001"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-main hover:text-white transition-colors text-gray-700"
              >
                <FaFacebookF className="text-lg" />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/abdelillah-derrar-42a81635a"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-main hover:text-white transition-colors text-gray-700"
              >
                <FaLinkedinIn className="text-lg" />
              </motion.a>
            </motion.div>

            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Ecom Pro. All rights reserved.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;