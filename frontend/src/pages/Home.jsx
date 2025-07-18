import Hero from "../components/Hero";
import ProductDisplay from "../components/ProductDisplay";
import { FiArrowRight, FiTrendingUp, FiAward, FiShield } from "react-icons/fi";

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <Hero />
      
      {/* Value Propositions */}
      <div className="bg-gradient-to-r from-main/5 to-indigo-600/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <FiTrendingUp className="w-8 h-8 text-main" />,
              title: "Trending Styles",
              desc: "Stay ahead with our curated fashion selections"
            },
            {
              icon: <FiAward className="w-8 h-8 text-main" />,
              title: "Premium Quality",
              desc: "Crafted with exceptional materials and attention to detail"
            },
            {
              icon: <FiShield className="w-8 h-8 text-main" />,
              title: "Secure Shopping",
              desc: "Your transactions are always protected"
            },
            {
              icon: <div className="w-8 h-8 bg-main rounded-full flex items-center justify-center text-white">✓</div>,
              title: "Easy Returns",
              desc: "Hassle-free returns within 30 days"
            }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-gray-600">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Collections */}
      <ProductDisplay />

      {/* Newsletter */}
      <div className="bg-gradient-to-r from-main to-indigo-600 text-white py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-main-100 mb-6">
            Subscribe to our newsletter for exclusive offers and style tips
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-main font-medium rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
              Subscribe <FiArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Minimalist Testimonials */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "The quality exceeded my expectations. Will definitely shop again!",
                author: "Alexandra M."
              },
              {
                quote: "Fast shipping and perfect fit. My new favorite store!",
                author: "James T."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <div className="text-gray-600 mb-4">"{testimonial.quote}"</div>
                <div className="text-sm font-medium text-gray-900">— {testimonial.author}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;