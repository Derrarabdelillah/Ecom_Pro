"use client"

import { motion } from "framer-motion"
import {
  Package,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingBag,
  Clock,
  Star,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Filter,
  Download,
  Eye,
  ChevronRight,
} from "lucide-react"

const Dashboard = () => {
  // Dashboard metrics data
  const metrics = [
    {
      value: "2,156",
      label: "Total Orders",
      icon: Package,
      change: "+18%",
      trend: "up",
      bg: "from-blue-600 to-blue-700",
      iconBg: "bg-blue-500/20",
    },
    {
      value: "$38,420",
      label: "Revenue",
      icon: DollarSign,
      change: "+24%",
      trend: "up",
      bg: "from-emerald-600 to-emerald-700",
      iconBg: "bg-emerald-500/20",
    },
    {
      value: "1,842",
      label: "Customers",
      icon: Users,
      change: "+12%",
      trend: "up",
      bg: "from-purple-600 to-purple-700",
      iconBg: "bg-purple-500/20",
    },
    {
      value: "6,742",
      label: "Products",
      icon: ShoppingBag,
      change: "-5%",
      trend: "down",
      bg: "from-orange-600 to-orange-700",
      iconBg: "bg-orange-500/20",
    },
  ]

  // Recent orders data
  const recentOrders = [
    {
      id: "#ORD-2189",
      customer: "John Smith",
      time: "12 min",
      status: "shipped",
      amount: "$148.00",
      priority: "high",
    },
    {
      id: "#ORD-2188",
      customer: "Sarah Johnson",
      time: "24 min",
      status: "processing",
      amount: "$85.50",
      priority: "medium",
    },
    {
      id: "#ORD-2187",
      customer: "Mike Davis",
      time: "36 min",
      status: "shipped",
      amount: "$223.75",
      priority: "high",
    },
    {
      id: "#ORD-2186",
      customer: "Emma Wilson",
      time: "48 min",
      status: "delivered",
      amount: "$64.25",
      priority: "low",
    },
  ]

  // Top products data
  const topProducts = [
    {
      name: "Wireless Earbuds Pro",
      sales: 248,
      rating: 4.8,
      revenue: "$12,400",
      growth: "+15%",
    },
    {
      name: "Smart Fitness Watch",
      sales: 192,
      rating: 4.6,
      revenue: "$9,600",
      growth: "+8%",
    },
    {
      name: "Bluetooth Speaker",
      sales: 156,
      rating: 4.5,
      revenue: "$7,800",
      growth: "+12%",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "processing":
        return "bg-amber-100 text-amber-800 border-amber-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      {/* Main dashboard container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 pb-6"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Monitor your store's performance and growth</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
              <Download className="h-4 w-4" />
              Export
            </button>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Activity className="text-white h-4 w-4" />
              <span className="text-sm font-medium text-white">Live Analytics</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl border border-white/20"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.bg} opacity-5`} />
                <div className="p-6 relative">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                      <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                      <div className="flex items-center gap-1">
                        {metric.trend === "up" ? (
                          <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-600" />
                        )}
                        <span
                          className={`text-sm font-semibold ${
                            metric.trend === "up" ? "text-emerald-600" : "text-red-600"
                          }`}
                        >
                          {metric.change}
                        </span>
                        <span className="text-sm text-gray-500">vs last month</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-2xl ${metric.iconBg}`}>
                      <IconComponent
                        className={`h-6 w-6 ${
                          metric.bg.includes("blue")
                            ? "text-blue-600"
                            : metric.bg.includes("emerald")
                              ? "text-emerald-600"
                              : metric.bg.includes("purple")
                                ? "text-purple-600"
                                : "text-orange-600"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales chart - left column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl border border-white/20">
              <div className="p-6 pb-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Sales Performance</h2>
                  <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                    {["Day", "Week", "Month", "Year"].map((period) => (
                      <button
                        key={period}
                        className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                          period === "Week"
                            ? "bg-white text-indigo-600 shadow-sm font-medium"
                            : "text-gray-600 hover:bg-white/50"
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6">
                {/* Enhanced chart placeholder */}
                <div className="h-80 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-2 border-dashed border-indigo-200 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5" />
                  <div className="text-center z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <TrendingUp className="text-white text-2xl" />
                    </div>
                    <p className="text-gray-600 font-medium">Interactive Sales Chart</p>
                    <p className="text-sm text-gray-500 mt-1">Revenue trends and analytics visualization</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right sidebar */}
          <div className="space-y-6">
            {/* Recent orders card */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <div className="rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl border border-white/20">
                <div className="p-6 pb-4 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                    <button className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                      View All
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {recentOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50/80 transition-colors group cursor-pointer"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900 text-sm">{order.id}</p>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{order.customer}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>{order.time} ago</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{order.amount}</p>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded">
                          <Eye className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Top products card */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <div className="rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl border border-white/20">
                <div className="p-6 pb-4 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-900">Top Products</h2>
                    <Star className="text-amber-500 h-5 w-5" />
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {topProducts.map((product, index) => (
                    <motion.div
                      key={product.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50/80 transition-colors group"
                    >
                      <div className="space-y-2 flex-1">
                        <p className="font-semibold text-gray-900 text-sm">{product.name}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="fill-amber-400 text-amber-400 h-3 w-3" />
                            <span className="text-xs text-gray-600">{product.rating}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-gray-900">{product.revenue}</p>
                            <p className="text-xs text-emerald-600 font-medium">{product.growth}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {product.sales} sold
                          </span>
                          <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded">
                            <MoreHorizontal className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard
