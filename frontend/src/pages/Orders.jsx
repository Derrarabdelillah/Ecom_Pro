import { useContext } from "react"
import { productsContext } from "../context/ProductsContext"

const Orders = () => {

  const { products, currency } = useContext(productsContext);

  return (
    <div className="container flex flex-col gap-3 my-5" >
        <h2 className="text-2xl font-bold" >Delivery Informations</h2>

        <div className="flex flex-col gap-3">
          
          {
            products.slice(1, 4).map( (product) => {
              return (
                <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 px-2 border-b border-grayBorder ">
                  
                <div className="flex gap-4 items-center">
                  {/* Product Image */}
                  <div className="w-20 h-20 flex-shrink-0 border border-gray-200 rounded-lg overflow-hidden ">
                    <img 
                      src={product.image[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
                    
                    {/* Price and Info */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm mb-2">
                      <span className="font-semibold text-gray-800">{product.price}{currency}</span>
                      <span className="text-gray-600">Quantity: 4</span>
                      <span className="text-gray-600">Size: M</span>
                    </div>

                    {/* Order Details */}
                    <div className="flex flex-col gap-1 text-sm">
                      
                      <div>
                        <span className="font-medium text-gray-700">Date: </span>
                        <span className="text-gray-600">Tue, Jul 15, 2025</span>
                      </div>

                      <div>
                        <span className="font-medium text-gray-700">Payment: </span>
                        <span className="text-gray-600">COD (Cash On Delivery)</span>
                      </div>

                    </div>
                    
                  </div>
                </div>

                <div className="flex items-center gap-2 border border-green-300 bg-green-50 px-3 py-1 rounded-full text-green-700 font-medium text-sm">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  pending..
                </div>  

                {/* Modern Track Order Button */}
                <button className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-sm text-gray-700 flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-gray-500" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Tracking...
                </button>
                </div>
              )
            } )
          }

        </div>
    </div>
  )
}

export default Orders;