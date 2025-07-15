import { Link } from "react-router-dom";
import { FaShoppingCart, FaEye, FaHeart } from "react-icons/fa";
import { useContext, useState } from "react";
import { productsContext } from "../context/ProductsContext";

const Item = ({ product, currency }) => {
  const [quickAddSize, setQuickAddSize] = useState(null);
  return (
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Product Image */}
      <div className="relative overflow-hidden aspect-square">
        <Link to={`/product/${product._id}`}>
          <img 
            src={product.image[0]} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </Link>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex gap-2">
          <Link 
            to={`/product/${product._id}`}
            className="p-2 bg-white rounded-full text-gray-800 hover:bg-main hover:text-white transition-colors shadow-sm"
            title="View Product"
          >
            <FaEye className="text-sm" />
          </Link>
          <button 
            className="p-2 bg-white rounded-full text-gray-800 hover:bg-main hover:text-white transition-colors shadow-sm"
            title="Add to Wishlist"
          >
            <FaHeart className="text-sm" />
          </button>
        </div>

        {/* Discount Badge */}
        {product.discount && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <span className="text-xs text-gray-500 uppercase">{product.category}</span>
          <h3 className="text-lg font-semibold mt-1 mb-2 line-clamp-2 hover:text-main transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-lg font-bold text-gray-900">
              {currency}{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                {currency}{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center">
            <span className="text-yellow-400 mr-1">
              ★
            </span>
            <span className="text-xs text-gray-600">
              {product.rating || '4.8'}
            </span>
          </div>
        </div>

        {/* Quick Add to Cart */}
        <div className="mt-3">
          {quickAddSize ? (
            <button
              onClick={() => {
                setQuickAddSize(null);
              }}
              className="w-full bg-main hover:bg-main-dark text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Link to={`/product/${product._id}`} className="flex flex-row gap-2 items-center" >
                <FaShoppingCart />
                Add {quickAddSize}
              </Link>
            </button>
          ) : (
            <div className="flex gap-2">
              {product.sizes.slice(0, 3).map(size => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.stopPropagation();
                    setQuickAddSize(size);
                  }}
                  className="flex-1 text-xs bg-gray-100 hover:bg-gray-200 py-2 px-2 rounded-md transition-colors"
                >
                  {size}
                </button>
              ))}
              {product.sizes.length > 3 && (
                <button className="text-xs bg-gray-100 hover:bg-gray-200 py-2 px-2 rounded-md transition-colors">
                  +{product.sizes.length - 3}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Best Seller/New Arrival Tag */}
      {product.tag && (
        <span className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full 
          ${product.tag === 'New' ? 'bg-blue-500 text-white' : 'bg-yellow-400 text-gray-900'}`}
        >
          {product.tag}
        </span>
      )}
    </div>
  );
};

export default Item;