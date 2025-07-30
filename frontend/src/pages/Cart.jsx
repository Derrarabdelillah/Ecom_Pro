import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { productsContext } from "../context/ProductsContext";
import TotalCart from "../components/TotalCart";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiTrash2, FiChevronLeft } from "react-icons/fi";

const Cart = () => {
  const navigate = useNavigate();
  const { products, currency, cartItems, updateQuantity } = useContext(productsContext);
  const [cartData, setCartData] = useState([]);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const inSize in cartItems[items]) {
        if (cartItems[items][inSize] > 0) {
          tempData.push({
            _id: items,
            size: inSize,
            quantity: cartItems[items][inSize]
          })
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const handleRemoveItem = (productId, size) => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      updateQuantity(productId, size, 0);
      setIsAnimatingOut(false);
    }, 300);
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      x: 50,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-8 cursor-pointer" onClick={() => navigate(-1)}>
        <FiChevronLeft className="w-5 h-5 mr-2" />
        <span className="text-sm font-medium">Continue Shopping</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      {cartData.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-main to-indigo-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
            onClick={() => navigate('/collections')}
          >
            Browse Collections
          </motion.button>
        </motion.div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 mb-4">
              <div className="col-span-5 font-medium text-gray-500">PRODUCT</div>
              <div className="col-span-2 font-medium text-gray-500">SIZE</div>
              <div className="col-span-3 font-medium text-gray-500">QUANTITY</div>
              <div className="col-span-2 font-medium text-gray-500 text-right">TOTAL</div>
            </div>

            <AnimatePresence>
              {cartData.map((product, index) => {
                const productData = products.find((prod) => prod._id === product._id);
                if (!productData) return null;

                return (
                  <motion.div
                    key={`${product._id}-${product.size}`}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="grid grid-cols-12 gap-4 py-6 border-b border-gray-100 items-center"
                  >
                    <div className="col-span-5 flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-50 rounded-md overflow-hidden">
                        <img 
                          src={productData.image[0]} 
                          alt={productData.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{productData.name}</h3>
                        <p className="text-gray-500">{productData.price}{currency}</p>
                      </div>
                    </div>

                    <div className="col-span-2">
                      <span className="px-3 py-1 border rounded-md text-sm bg-white border-gray-200">
                        {product.size}
                      </span>
                    </div>

                    <div className="col-span-3">
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(product._id, product.size, product.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-50"
                          disabled={product.quantity <= 1}
                        >
                          -
                        </motion.button>
                        <span className="w-12 text-center">{product.quantity}</span>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(product._id, product.size, product.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-50"
                        >
                          +
                        </motion.button>
                      </div>
                    </div>

                    <div className="col-span-2 flex items-center justify-end gap-4">
                      <p className="font-medium">
                        {(productData.price * product.quantity).toFixed(2)}{currency}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRemoveItem(product._id, product.size)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FiTrash2 />
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-gray-50 p-6 rounded-xl">
              <TotalCart />
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/checkout')}
                className="w-full mt-6 py-3 bg-gradient-to-r from-main to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Proceed to Checkout <FiArrowRight />
              </motion.button>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                Free shipping and returns on all orders
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;