import { useContext } from "react";
import { motion } from "framer-motion";
import { productsContext } from "../context/ProductsContext";

const TotalCart = ({ widt }) => {
  const { getCartAmount, delivery_fee, currency, getTotalWithDelivery } = useContext(productsContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`w-full ${widt ? `md:${widt}` : ''} flex flex-col`}
    >
      <h2 className="text-xl font-bold mb-6 pb-2 border-b border-gray-200">Order Summary</h2>

      <div className="flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{getCartAmount()} {currency}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">{delivery_fee} {currency}</span>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <span className="font-bold text-lg">Total</span>
          <span className="font-bold text-lg">{getTotalWithDelivery()} {currency}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TotalCart;