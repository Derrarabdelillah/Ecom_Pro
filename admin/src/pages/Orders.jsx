import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { productsContext } from "../../../frontend/src/context/ProductsContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiPackage, FiTruck, FiCheckCircle, FiClock, 
  FiUser, FiPhone, FiMapPin, FiMail, 
  FiChevronLeft, FiChevronRight, FiDollarSign, FiEdit2
} from "react-icons/fi";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [editingStatus, setEditingStatus] = useState(null);
  const { backendUrl, token, currency } = useContext(productsContext);

  // Fetch orders
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/orders/adminOrders`, { 
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    getOrders();
  }, [backendUrl, token]);

  // Filter orders by status
  const filteredOrders = selectedStatus === "all" 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Status options
  const statusOptions = [
    { value: "all", label: "All", icon: <FiPackage /> },
    { value: "pending", label: "Pending", icon: <FiClock /> },
    { value: "processing", label: "Processing", icon: <FiEdit2 /> },
    { value: "shipped", label: "Shipped", icon: <FiTruck /> },
    { value: "delivered", label: "Delivered", icon: <FiCheckCircle /> },
  ];

  // Status colors
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-purple-100 text-purple-800",
    shipped: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
  };

  // Format price to 2 decimal places
  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        setOrders(orders.map(order => 
          order._id === orderId ? { ...order, status: newStatus } : order
        ));
        setEditingStatus(null);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Order Dashboard</h1>
          <p className="text-gray-600 mt-1 text-sm md:text-base">Manage customer orders</p>
        </div>

        {/* Status Filter - Horizontal Scroll on Mobile */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 w-max pb-2">
            {statusOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center px-3 py-1.5 rounded-lg text-sm whitespace-nowrap ${
                  selectedStatus === option.value
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-white text-gray-700 shadow-sm hover:bg-gray-100"
                }`}
                onClick={() => {
                  setSelectedStatus(option.value);
                  setCurrentPage(1);
                }}
              >
                <span className="mr-1.5">{option.icon}</span>
                {option.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Orders List - Compact View */}
        <div className="space-y-3">
          {currentOrders.length === 0 ? (
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
                <FiPackage className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No orders found</h3>
              <p className="text-gray-500 text-sm">No orders match the current filters</p>
            </div>
          ) : (
            currentOrders.map((order) => (
              <motion.div
                key={order._id}
                layout
                className="bg-white rounded-lg shadow-xs border border-gray-200 overflow-hidden"
              >
                {/* Compact Order Header */}
                <div 
                  className="p-4 flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      statusColors[order.status]?.split(' ')[0] || 'bg-gray-300'
                    }`}></div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm md:text-base">
                        #{order.orderNumber}
                      </h3>
                      <p className="text-gray-500 text-xs">
                        {order.customer} • {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm md:text-base">
                      {formatPrice(order.deliveryInfos.total)} {currency}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedOrder === order._id ? 180 : 0 }}
                      className="text-gray-400"
                    >
                      <FiChevronRight />
                    </motion.div>
                  </div>
                </div>

                {/* Expanded Order Details */}
                <AnimatePresence>
                  {expandedOrder === order._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-gray-200"
                    >
                      <div className="p-4">
                        {/* Customer Info */}
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-700 text-sm mb-2">CUSTOMER</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-start gap-2">
                              <FiUser className="text-gray-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-gray-500">Name</p>
                                <p className="font-medium">{order.customer}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <FiPhone className="text-gray-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-gray-500">Phone</p>
                                <p className="font-medium">{order.deliveryInfos.phone}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <FiMail className="text-gray-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-gray-500">Email</p>
                                <p className="font-medium truncate">{order.deliveryInfos.email}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <FiMapPin className="text-gray-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-gray-500">Address</p>
                                <p className="font-medium">
                                  {order.deliveryInfos.street}, Wilaya {order.deliveryInfos.wilaya}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Products */}
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-700 text-sm mb-2">PRODUCTS ({order.products.length})</h4>
                          <div className="space-y-3">
                            {order.products.map((product) => (
                              <div key={product.productId} className="flex gap-3 text-sm">
                                <div className="flex-shrink-0 w-12 h-12 rounded border border-gray-200 overflow-hidden">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.src = "https://via.placeholder.com/80";
                                    }}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium truncate">{product.name}</p>
                                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-gray-600">
                                    <span>Qty: {product.quantity}</span>
                                    <span>Size: {product.size}</span>
                                    <span>{formatPrice(product.price)} {currency}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Order Summary */}
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-700 text-sm mb-2">ORDER SUMMARY</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Subtotal</span>
                              <span className="font-medium">{formatPrice(order.deliveryInfos.subTotal)} {currency}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Delivery Fee</span>
                              <span className="font-medium">{formatPrice(order.deliveryInfos.deliveryFee)} {currency}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-gray-100">
                              <span className="font-semibold">Total</span>
                              <span className="font-bold">{formatPrice(order.deliveryInfos.total)} {currency}</span>
                            </div>
                          </div>
                        </div>

                        {/* Status Management */}
                        <div>
                          <h4 className="font-medium text-gray-700 text-sm mb-2">STATUS</h4>
                          {editingStatus === order._id ? (
                            <div className="flex flex-wrap gap-2">
                              {statusOptions.filter(opt => opt.value !== "all").map(option => (
                                <motion.button
                                  key={option.value}
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.97 }}
                                  className={`px-3 py-1.5 rounded-lg text-xs ${
                                    order.status === option.value
                                      ? "bg-indigo-600 text-white"
                                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                  }`}
                                  onClick={() => updateOrderStatus(order._id, option.value)}
                                >
                                  {option.label}
                                </motion.button>
                              ))}
                              <button 
                                className="text-xs text-gray-500 hover:text-gray-700 ml-2"
                                onClick={() => setEditingStatus(null)}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                statusColors[order.status] || "bg-gray-100 text-gray-800"
                              }`}>
                                {order.status}
                              </span>
                              <button 
                                className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                                onClick={() => setEditingStatus(order._id)}
                              >
                                <FiEdit2 size={12} /> Change
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>

        {/* Pagination */}
        {filteredOrders.length > ordersPerPage && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstOrder + 1}-{Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg ${
                  currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiChevronLeft />
              </motion.button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <motion.button
                      key={pageNum}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                        currentPage === pageNum 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </motion.button>
                  );
                })}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg ${
                  currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiChevronRight />
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;