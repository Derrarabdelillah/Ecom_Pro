import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react"
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom"
import { productsContext } from "../../../frontend/src/context/ProductsContext";
import Item from "../components/Item";
const backendUrl = "http://localhost:3000";

const Products = ({ token }) => {
  const [products, setProducts] = useState([]);
  const { currency } = useContext(productsContext)


  useEffect(() => {
    const getProducts = async () => {
      const data = await axios.get(backendUrl + '/api/product/all');

      if (data) {
        setProducts(data.data);
      }

    }

    getProducts();
  }, [])

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
            <Item key={product._id} product={product} currency={currency} />
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
