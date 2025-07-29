import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { productsContext } from "../context/ProductsContext";
import TotalCart from "../components/TotalCart";
import { FiArrowRight, FiCheckCircle, FiShoppingBag, FiClock, FiMapPin, FiCreditCard } from "react-icons/fi";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const CheckOut = () => {
  const navigate = useNavigate();
  const {
    selectedWilaya,
    algerianWilayas,
    handleWilayaChange,
    getCartAmount, 
    delivery_fee,
    getTotalWithDelivery,
    getCartProductsArray,
    backendUrl,
    setCartItems,
    user,
    userId,
    token
  } = useContext(productsContext); 
  
  const [deliveryInfos, setDeliveryInfos] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    wilaya: '',
    street: ''
  });
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderData, setOrderData] = useState(null);
  
  const customer = `${deliveryInfos.firstName} ${deliveryInfos.lastName}`;
  const products = getCartProductsArray();

  useEffect(() => {
    setDeliveryInfos(prev => ({
      ...prev,
      wilaya: selectedWilaya,
      deliveryFee: delivery_fee,
      subTotal: getCartAmount(),
      total: getTotalWithDelivery()
    }));
  }, [selectedWilaya, delivery_fee, getCartAmount, getTotalWithDelivery]);

  const onChnageHandler = (event) => {
    const { name, value } = event.target;
    setDeliveryInfos(data => ({...data, [name]: value}));
  };

  const placeOrder = async () => {
    setIsPlacingOrder(true);
    try {
      const orderData = {
        customer: customer,
        userId: userId,
        products: products.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          image: item.image[0],
          category: item.category
        })),
        deliveryInfos: deliveryInfos,
      };
      
      const response = await axios.post(`${backendUrl}/api/orders/placeOrder`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        setOrderData(response.data.order);
        setCartItems({});
        setOrderSuccess(true);
        setDeliveryInfos({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          wilaya: '',
          street: ''
        })
      }
    } catch (error) {
      console.error("Order error:", error);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Order Success Modal */}
      <AnimatePresence>
        {orderSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
            >
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-50 mb-4">
                  <FiCheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h3>
                <p className="text-gray-600 mb-1">
                  Your order <span className="font-semibold">#{orderData?.orderNumber}</span> is confirmed
                </p>
                <p className="text-sm text-gray-500 mb-6">We've sent a confirmation to your email</p>
                
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-600 flex items-center">
                      <FiClock className="mr-2" /> Estimated delivery
                    </span>
                    <span className="font-medium">2-3 business days</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-600 flex items-center">
                      <FiMapPin className="mr-2" /> Delivery to
                    </span>
                    <span className="font-medium">{deliveryInfos.wilaya}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center">
                      <FiCreditCard className="mr-2" /> Total
                    </span>
                    <span className="font-medium text-lg">{orderData?.totalAmount} DZD</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setOrderSuccess(false)}
                    className="w-full py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Your existing checkout form remains exactly the same */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row gap-8"
      >
        {/* Delivery Information */}
        <div className="lg:w-1/2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold mb-6">Delivery Information</h2>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    onChange={onChnageHandler}
                    name="firstName"
                    value={deliveryInfos.firstName}
                    type="text" 
                    className="outline-none w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input 
                    onChange={onChnageHandler}
                    name="lastName"
                    value={deliveryInfos.lastName}
                    type="text" 
                    className="outline-none w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  onChange={onChnageHandler}
                  name="email"
                  value={deliveryInfos.email}                  
                  type="email" 
                  className="outline-none w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <input
                  onChange={onChnageHandler}
                  name="street"
                  value={deliveryInfos.street} 
                  type="text" 
                  className="outline-none w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
                  placeholder="123 Main Street"
                />
              </div>

              <div className="grid grid-cols-1 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Wilaya</label>
                  <select 
                    className="outline-none w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
                    value={selectedWilaya}
                    onChange={(e) => handleWilayaChange(e.target.value)}
                    required
                  >
                    <option value="">Select Wilaya</option>
                    {algerianWilayas.map((wilaya) => (
                      <option key={wilaya.id} value={wilaya.id} >
                        {wilaya.name} - {wilaya.fee} DZD
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input 
                    type="text" 
                    className="outline-none w-full border border-gray-300 px-4 py-3 rounded-lg bg-gray-100"
                    value="Algeria" 
                    readOnly 
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  onChange={onChnageHandler}
                  name="phone"
                  value={deliveryInfos.phone} 
                  type="number" 
                  className="outline-none w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
                  placeholder="0550123456"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <TotalCart widt='w-full' />
              
              <div className="mt-8">
                <h3 className="text-lg font-bold mb-4">Payment Method</h3>
                <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <FiCheckCircle className="text-green-500 w-6 h-6" />
                  <span className="font-medium">Cash on Delivery</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Pay with cash upon delivery of your order
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => placeOrder()}
                className="w-full cursor-pointer mt-8 py-4 bg-gradient-to-r from-main to-indigo-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 uppercase"
              >
                {isPlacingOrder ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    Place Order <FiArrowRight />
                  </>
                )}
              </motion.button>

              <p className="text-xs text-gray-500 mt-4">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckOut;