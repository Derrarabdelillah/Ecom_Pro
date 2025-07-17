import axios from "axios";
import { useEffect, useState } from "react"
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom"
const backendUrl = "http://localhost:3000";

const Products = ({token}) => {
  const [products, setProducts] = useState([]);

  
  useEffect( () => {
    const getProducts = async () => {
      const data = await axios.get(backendUrl + '/api/product/all');
      
      if ( data ) {
        setProducts(data.data);
      }
      
    }
    
    getProducts();
  }, [] )

  const removeProduct = async () => {
    
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Products
              {products.length > 0 && (
                <span className="ml-2 text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {products.length}
                </span>
              )}
            </h2>
            <p className="text-sm text-gray-500 mt-1">Manage your product catalog</p>
          </div>
          
          <Link
            to="/add"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-main to-indigo-600 focus:outline-none hover:from-main hover:to-indigo-800"
          >
            <FiPlus className="mr-2" />
            Add Product
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
          {products.map((product) => (
            <div key={product._id} className="group relative bg-white rounded-lg border border-grayBorder overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
              {/* Product Image */}
              <div className="aspect-square bg-gray-50 overflow-hidden">
                {product.image?.[0] ? (
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {product.name}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    ${product.price}
                  </span>
                </div>
                
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500">
                    {product.category} • {product.subCategory}
                  </span>
                  {product.bestseller ? (
                    <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                      Bestseller
                    </span>
                  ) : ''
                  }
                </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button className="p-2 rounded-full bg-white text-gray-600 hover:text-blue-600 shadow-sm hover:shadow-md">
                  <FiEdit2 className="w-4 h-4" />
                </button>
                <button 
                onClick={removeProduct}
                className="p-2 rounded-full bg-white text-gray-600 hover:text-red-600 shadow-sm hover:shadow-md">
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="p-12 text-center">
            <div className="mx-auto h-24 w-24 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding a new product
            </p>
            <div className="mt-6">
              <Link
                to="/add"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-tr from-main to-indigo-600 hover:from-main hover:to-indigo-800 "
              >
                <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                Add Product
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products
