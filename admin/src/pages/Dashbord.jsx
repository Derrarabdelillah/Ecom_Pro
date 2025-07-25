import { FiPackage, FiShoppingCart, FiDollarSign, FiTrendingUp } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import { productsContext } from '../../../frontend/src/context/ProductsContext' 
import axios from 'axios'

const Dashboard = () => {
  const { backendUrl, token, currency } = useContext(productsContext)
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    recentOrders: []
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          axios.get(`${backendUrl}/api/orders/adminOrders`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${backendUrl}/api/product/all`)
        ])

        const totalRevenue = ordersRes.data.orders.reduce(
          (sum, order) => sum + order.deliveryInfos.total, 0
        )

        setStats({
          totalOrders: ordersRes.data.orders.length,
          totalRevenue,
          totalProducts: productsRes.data.length,
          recentOrders: ordersRes.data.orders.slice(0, 5)
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    if (token) fetchStats()
  }, [token, backendUrl])

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

  return (
    <div className="h-full bg-white rounded-lg p-6">
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
        value="24"
        label="Total Orders"
        cardType="orders"
      />
      <StatCard
        icon={<FiDollarSign size={20} />}
        value="$1,234"
        label="Total Revenue"
        cardType="revenue"
      />
      <StatCard
        icon={<FiPackage size={20} />}
        value="56"
        label="Products in Store"
        cardType="products"
      />
      <StatCard
        icon={<FiTrendingUp size={20} />}
        value="$51.42"
        label="Avg. Order Value"
        cardType="average"
      />
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
                No recent orders found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard