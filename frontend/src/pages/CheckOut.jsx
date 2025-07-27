import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { productsContext } from "../context/ProductsContext";
import TotalCart from "../components/TotalCart";
import { FiArrowRight, FiCheckCircle, FiShoppingBag } from "react-icons/fi";
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
    street: '',
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
              className="bg-white rounded-xl p-8 max-w-md w-full border border-grayBorder"
            >
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <FiCheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                    required
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
                    required
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
                  required
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
                  required
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
                  required
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
                onClick={placeOrder}
                disabled={isPlacingOrder || !deliveryInfos.firstName || !deliveryInfos.lastName || !deliveryInfos.email || !deliveryInfos.phone || !deliveryInfos.street || !selectedWilaya}
                className={`w-full mt-8 py-4 ${isPlacingOrder || !deliveryInfos.firstName || !deliveryInfos.lastName || !deliveryInfos.email || !deliveryInfos.phone || !deliveryInfos.street || !selectedWilaya ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-main to-indigo-600 hover:shadow-lg'} text-white font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 uppercase`}
              >
                {isPlacingOrder ? (
                  'Processing...'
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