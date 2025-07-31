import { FiPackage, FiShoppingCart, FiDollarSign, FiBarChart2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
  const [isLoading, setIsLoading] = useState(true);
  const currency = 'DZD';
  const backendUrl = "https://ecom-pro-0qxb.onrender.com";

  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    recentOrders: [],
    salesData: [] // Add sales data for the chart
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          axios.get(`${backendUrl}/api/orders/adminOrders`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${backendUrl}/api/product/all`)
        ]);

        const totalRevenue = ordersRes.data.orders.reduce(
          (sum, order) => sum + order.deliveryInfos.total, 0
        );

        // Prepare monthly sales data for the chart
        const monthlySales = Array(12).fill(0);
        ordersRes.data.orders.forEach(order => {
          const month = new Date(order.createdAt).getMonth();
          monthlySales[month] += order.deliveryInfos.total;
        });

        setStats({
          totalOrders: ordersRes.data.orders.length,
          totalRevenue,
          totalProducts: productsRes.data.length,
          recentOrders: ordersRes.data.orders.slice(0, 5),
          salesData: monthlySales
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setIsLoading(false);
      }
    };


      fetchStats()

  }, [token, backendUrl]);

  // Loading Spinner Component
  const LoadingSpinner = () => (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center"
    >
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 1.5,
          ease: "linear"
        }}
        className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"
      />
    </motion.div>
  );

  const StatCard = ({ icon, value, label, cardType }) => {
    // Gradient configurations for each card type
    const gradientConfig = {
      orders: {
        bg: 'bg-gradient-to-br from-blue-50/80 to-indigo-50/80',
        iconBg: 'bg-gradient-to-br from-blue-100 to-indigo-100',
        iconColor: 'text-blue-600'
      },
      revenue: {
        bg: 'bg-gradient-to-br from-green-50/80 to-teal-50/80',
        iconBg: 'bg-gradient-to-br from-green-100 to-teal-100',
        iconColor: 'text-green-600'
      },
      products: {
        bg: 'bg-gradient-to-br from-amber-50/80 to-orange-50/80',
        iconBg: 'bg-gradient-to-br from-amber-100 to-orange-100',
        iconColor: 'text-amber-600'
      },
      average: {
        bg: 'bg-gradient-to-br from-purple-50/80 to-pink-50/80',
        iconBg: 'bg-gradient-to-br from-purple-100 to-pink-100',
        iconColor: 'text-purple-600'
      }
    }

    const config = gradientConfig[cardType] || gradientConfig.orders

    return (
      <motion.div 
        whileHover={{ y: -3 }}
        className={`${config.bg} border border-gray-200 rounded-xl p-5 shadow-xs transition-all duration-200`}
      >
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-lg ${config.iconBg} ${config.iconColor}`}>
            {icon}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          <p className="text-sm text-gray-500 mt-1">{label}</p>
        </div>
      </motion.div>
    )
  }

  // Chart Data
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Sales',
      data: stats.salesData,
      backgroundColor: 'rgba(99, 102, 241, 0.7)',
      borderRadius: 6,
      borderSkipped: false,
      barThickness: 20
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        callbacks: {
          label: (context) => {
            return ` ${currency}${context.raw.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          color: 'rgba(0, 0, 0, 0.03)'
        },
        ticks: {
          callback: (value) => currency + value
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false
        }
      }
    }
  };

  return (
    <div className="h-full bg-white rounded-lg p-6">
      <AnimatePresence>
        {isLoading && <LoadingSpinner />}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-gray-500 mt-1">Store overview and analytics</p>
          </div>
          <div className="mt-3 sm:mt-0 text-sm text-indigo-600">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard
            icon={<FiShoppingCart size={20} />}
            value={stats.totalOrders}
            label="Total Orders"
            cardType="orders"
          />
          <StatCard
            icon={<FiDollarSign size={20} />}
            value={( stats.totalRevenue ).toFixed(2) + currency}
            label="Total Revenue"
            cardType="revenue"
          />
          <StatCard
            icon={<FiPackage size={20} />}
            value={stats.totalProducts}
            label="Products in Store"
            cardType="products"
          />
          <StatCard
            icon={<FiBarChart2 size={20} />}
            value={stats.totalOrders > 0 ? 
            `${((stats.totalRevenue / stats.totalOrders).toFixed(2))}${currency}` : 
            `0${currency}`}
            label="Sales Growth"
            cardType="growth"
          />
        </div>

        {/* Sales Chart Section */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 mb-8 shadow-xs">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-900">Monthly Performance</h3>
            <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">
              {currency}{stats.totalRevenue.toFixed(2)} total
            </span>
          </div>
          <div className="h-80">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-gradient-to-b from-white to-gray-50 border border-gray-100 rounded-xl shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-medium text-gray-900">Recent Orders</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {stats.recentOrders.length > 0 ? (
              stats.recentOrders.map((order) => (
                <motion.div 
                  key={order._id}
                  whileHover={{ backgroundColor: 'rgba(249, 250, 251, 1)' }}
                  className="p-4 flex items-center justify-between bg-gradient-to-r from-white to-gray-50/50"
                >
                  <div>
                    <p className="font-medium">#{order.orderNumber}</p>
                    <p className="text-sm text-gray-500">
                      {order.customer} • {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{currency}{order.deliveryInfos.total.toFixed(2)}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'delivered' 
                        ? 'bg-green-50 text-green-700 border border-green-100'
                        : order.status === 'cancelled'
                        ? 'bg-red-50 text-red-700 border border-red-100'
                        : 'bg-yellow-50 text-yellow-700 border border-yellow-100'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 bg-gradient-to-b from-white to-gray-50">
                {isLoading ? 'Loading orders...' : 'No recent orders found'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard