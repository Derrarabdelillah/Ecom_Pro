import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiPackage } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Item from "../components/Item"


const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const currency = 'DZD';

  const backendUrl = "https://ecom-pro-0qxb.onrender.com";
  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/product/all`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, [products]);


  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full bg-white rounded-lg p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-lg overflow-hidden"
      >
        {/* Header with Search */}
        <div className="">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Products
                {filteredProducts.length > 0 && (
                  <span className="ml-2 text-sm font-medium text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                    {filteredProducts.length}
                  </span>
                )}
              </h2>
              <p className="text-sm text-gray-500 mt-1">Manage your product inventory</p>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Link
                to="/add"
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-tr from-main to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <FiPlus className="mr-2" />
                Add New
              </Link>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {filteredProducts.map((product) => (
              <Item key={product._id} product={product} currency={currency} />
            ))}
          </div>
        ) : (
          <EmptyState searchTerm={searchTerm} />
        )}
      </motion.div>
    </div>
  );
};

const ProductItem = ({ product, currency }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
    >
      {/* Product Image */}
      <div className="aspect-square bg-gray-50 overflow-hidden relative">
        {product.image?.[0] ? (
          <img
            src={product.image[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
            <FiPackage className="w-12 h-12" />
          </div>
        )}
        {product.bestseller && (
          <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded-full bg-amber-500 text-white">
            Bestseller
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-sm font-semibold bg-indigo-100 text-indigo-800 ml-2">
            {currency}{product.price}
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-3 flex justify-between items-center">
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {product.category}
          </span>
          <div className="flex space-x-1">
            <button className="p-1.5 rounded-full bg-white text-gray-500 hover:text-blue-600 hover:bg-blue-50 shadow-sm transition-colors duration-200">
              <FiEdit2 className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded-full bg-white text-gray-500 hover:text-red-600 hover:bg-red-50 shadow-sm transition-colors duration-200">
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const EmptyState = ({ searchTerm }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-12 text-center"
    >
      <div className="mx-auto h-24 w-24 text-gray-300">
        <FiPackage className="w-full h-full" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">
        {searchTerm ? "No matching products" : "No products yet"}
      </h3>
      <p className="mt-2 text-sm text-gray-500">
        {searchTerm
          ? "Try adjusting your search or filter to find what you're looking for"
          : "Get started by adding your first product"}
      </p>
      <div className="mt-6">
        <Link
          to="/add"
          className="inline-flex items-center px-4 py-2  shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          <FiPlus className="-ml-1 mr-2 h-5 w-5" />
          Add Product
        </Link>
      </div>
    </motion.div>
  );
};

export default Products;