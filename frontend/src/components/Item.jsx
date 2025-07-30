import { Link } from "react-router-dom";
import { FaShoppingCart, FaEye, FaHeart, FaStar } from "react-icons/fa";
import { useState } from "react";

const Item = ({ product, currency }) => {
  const [quickAddSize, setQuickAddSize] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-[420px]">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <Link to={`/product/${product._id}`} className="block h-full">
          {product.image?.[0] ? (
            <img
              src={product.image[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">
              No Image
            </div>
          )}
        </Link>

        {/* Badges */}
        {product.bestseller && (
          <span className="absolute top-3 left-3 bg-main text-white text-xs font-bold px-2 py-1 rounded-full">
            Bestseller
          </span>
        )}

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
          <button 
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`p-2 cursor-pointer rounded-full shadow-md transition-colors ${isWishlisted ? 'bg-main text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          >
            <FaHeart className="text-sm" />
          </button>
          <Link 
            to={`/product/${product._id}`}
            className="p-2 bg-white rounded-full shadow-md text-gray-700 hover:bg-gray-100 transition-colors block"
          >
            <FaEye className="text-sm" />
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-1 hover:text-main transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex text-amber-400 mr-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="w-3 h-3" />
            ))}
          </div>
          <span className="text-xs text-gray-500">(24)</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold text-gray-900">
            {currency}{product.price?.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {currency}{product.originalPrice?.toFixed(2)}
            </span>
          )}
        </div>

        {/* Quick Add */}
        <div className="mt-2">
          {quickAddSize ? (
            <Link to={`/product/${product._id}`}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setQuickAddSize(null);
                }}
                className="w-full cursor-pointer bg-main hover:bg-main-dark text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <FaShoppingCart className="text-sm" />
                Add {quickAddSize}
              </button>
            </Link>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {product.sizes?.slice(0, 4).map((size) => (
                <button
                  key={size}
                  onClick={() => setQuickAddSize(size)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 py-2 px-1 rounded transition-colors truncate"
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;