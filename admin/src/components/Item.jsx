import { useState } from 'react';
import axios from "axios";
import { FiEdit2, FiTrash2, FiX, FiAlertTriangle } from "react-icons/fi";
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie'

const Item = ({ product, currency }) => {
  const cookies = new Cookies();
  const [token] = useState(cookies.get('token') || '');
  const backendUrl = "https://ecom-pro-0qxb.onrender.com";
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const removeProduct = async (productId) => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(`${backendUrl}/api/product/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        toast.success('Product removed successfully', {
          position: 'top-right',
          className: 'bg-green-50 text-green-800',
          progressClassName: 'bg-green-200'
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove product', {
        position: 'top-right',
        className: 'bg-red-50 text-red-800',
        progressClassName: 'bg-red-200'
      });
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="relative w-full">
      {/* Product Card */}
      <div className="group relative bg-white rounded-lg border border-grayBorder overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
        {/* Product Image - Fixed Aspect Ratio */}
        <div className="aspect-square bg-gray-50 overflow-hidden relative">
          {product.image?.[0] ? (
            <img
              src={product.image[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* Product Info - Flex-grow to take remaining space */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
              {product.name}
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 whitespace-nowrap ml-2">
              {currency}{product.price}
            </span>
          </div>

          <p className="mt-1 text-sm text-gray-500 line-clamp-2 flex-grow">
            {product.description}
          </p>

          <div className="mt-3 flex justify-between items-center">
            <span className="text-xs font-medium text-gray-500 truncate">
              {product.category} • {product.subCategory}
            </span>
            {product.bestseller && (
              <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full whitespace-nowrap">
                Bestseller
              </span>
            )}
          </div>

          <div className="mt-2">
            {!product.stock ? (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-800">
                Out of stock
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-800">
                In stock ({product.stock})
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Link to={`/update/${product._id}`}>
            <button
              //  onClick={() => { handleProductEdit(product._id) } }
              className="p-2 rounded-full bg-white text-gray-600 hover:text-blue-600 shadow-sm hover:shadow-md cursor-pointer">
              <FiEdit2 className="w-4 h-4" />
            </button>
          </Link>
          <button
            onClick={() => setShowConfirm(true)}
            className="p-2 rounded-full bg-white text-gray-600 hover:text-red-600 shadow-sm hover:shadow-md cursor-pointer">
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => !isDeleting && setShowConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <FiAlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Product</h3>
                <p className="text-sm text-gray-500 mb-6">
                  Are you sure you want to delete "{product.name}"? This action cannot be undone.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={() => setShowConfirm(false)}
                    className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={() => removeProduct(product._id)}
                    className="cursor-pointer px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 rounded-md text-sm font-medium text-white hover:from-red-700 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-70 transition-colors"
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Item