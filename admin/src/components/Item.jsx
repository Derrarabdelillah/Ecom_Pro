import { FiEdit2, FiTrash2 } from "react-icons/fi";


const Item = ({product, currency}) => {
  return (
    <div>
            <div className="group relative bg-white rounded-lg border border-grayBorder overflow-hidden shadow-sm hover:shadow-md min-h-97 max-h-100 transition-shadow duration-200">

              {/* Product Image */}
              <div className="aspect-square bg-gray-50 overflow-hidden">

                {product.image?.[0] ? (

                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )
                  : (
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
                    {currency}{product.price}
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
                <button className="p-2 rounded-full bg-white text-gray-600 hover:text-blue-600 shadow-sm hover:shadow-md cursor-pointer">
                  <FiEdit2 className="w-4 h-4" />
                </button>
                <button
                //   onClick={removeProduct}
                  className="p-2 rounded-full bg-white text-gray-600 hover:text-red-600 shadow-sm hover:shadow-md cursor-pointer">
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
    </div>
  )
}

export default Item
