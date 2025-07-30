import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { productsContext } from "../context/ProductsContext";
import Item from "./Item";
import { Link } from "react-router-dom";

const ProductDisplay = () => {
  const { products, currency } = useContext(productsContext);
  const bestSellers = products.filter((product) => product.bestseller === true);

  // Empty state variants for animation
  const emptyStateVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  if (products.length === 0) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={emptyStateVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center"
      >
        <div className="inline-block bg-gray-100 p-6 rounded-full mb-8">
          <svg
            className="w-16 h-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Our Collection is Currently Empty
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          We're preparing something special for you. Check back soon for our latest arrivals.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-main text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
        >
          Notify Me When Available
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Discover Our Collection
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 max-w-3xl mx-auto"
        >
          Curated selection of premium products designed for your lifestyle
        </motion.p>
      </div>

      {/* Latest Collections */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900">Latest Collections</h2>
            <p className="text-gray-500 mt-2">
              Fresh arrivals that redefine contemporary style
            </p>
          </motion.div>
          
          <Link to='/collections' >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 md:mt-0 px-6 py-2 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              View All
            </motion.button>
          </Link>
          
        </div>

        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Item product={product} currency={currency} />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </section>

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="mt-16">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900">Best Sellers</h2>
              <p className="text-gray-500 mt-2">
                Customer favorites that never go out of style
              </p>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 md:mt-0 px-6 py-2 bg-main text-white rounded-full text-sm font-medium hover:bg-main-dark transition-colors"
            >
              Shop Bestsellers
            </motion.button>
          </div>

          <AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {bestSellers.slice(0, 4).map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Item product={product} currency={currency} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </section>
      )}

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-20 bg-gray-50 rounded-xl p-8 md:p-12 text-center"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Can't Find What You're Looking For?
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Our personal shoppers can help you discover the perfect items for your needs.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-main text-white rounded-lg font-medium hover:bg-main-dark transition-colors shadow-md hover:shadow-lg"
        >
          Contact Our Stylists
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ProductDisplay;