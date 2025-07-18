import { useContext } from "react";
import { productsContext } from "../context/ProductsContext";
import Item from "./Item";

const ProductDisplay = () => {
  const { products, currency } = useContext(productsContext);
  const bestSellers = products.filter((product) => product.bestseller === true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Discover Our Collection
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Curated selection of premium products designed for your lifestyle
        </p>
      </div>

      {/* Latest Collections */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Latest Collections</h2>
            <p className="text-gray-500 mt-2">
              Fresh arrivals that redefine contemporary style
            </p>
          </div>
          <button className="mt-4 md:mt-0 px-6 py-2 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product) => (
            <Item key={product._id} product={product} currency={currency} />
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="mt-16">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Best Sellers</h2>
              <p className="text-gray-500 mt-2">
                Customer favorites that never go out of style
              </p>
            </div>
            <button className="mt-4 md:mt-0 px-6 py-2  text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              Shop Bestsellers
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.slice(0, 4).map((product) => (
              <Item key={product._id} product={product} currency={currency} />
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <div className="mt-20 bg-gray-50 rounded-xl p-8 md:p-12 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Can't Find What You're Looking For?
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Our personal shoppers can help you discover the perfect items for your needs.
        </p>
        <button className="px-8 py-3 bg-main text-white rounded-lg font-medium hover:bg-main-dark transition-colors">
          Contact Our Stylists
        </button>
      </div>
    </div>
  );
};

export default ProductDisplay;