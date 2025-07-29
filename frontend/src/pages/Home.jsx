import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiTrendingUp, FiAward, FiShield, FiRefreshCw, FiShoppingBag } from "react-icons/fi";
import { FaStar, FaRegStar, FaStarHalfAlt, FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Hero from "../components/Hero";
import ProductDisplay from "../components/ProductDisplay";
import { productsContext } from "../context/ProductsContext";
import { useState, useEffect, useContext } from "react";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { products } = useContext(productsContext);

  // Testimonial data (unchanged)
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Fashion Boutique Owner",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      quote: "Ecom Pro transformed my online store completely. The intuitive dashboard and analytics helped me increase sales by 40% in just two months!",
      highlight: "40% sales increase"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "E-commerce Manager",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      quote: "The seamless integration and mobile responsiveness of Ecom Pro saved us countless hours. Our conversion rates improved dramatically.",
      highlight: "Improved conversion rates"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Digital Marketer",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      rating: 5,
      quote: "As a marketer, I appreciate Ecom Pro's built-in SEO tools and marketing automation. It's like having an entire team in one platform.",
      highlight: "Powerful marketing tools"
    }
  ];

  // Animation variants (unchanged)
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
  // Hide loading when products are available
  if (products && products.length > 0) {
    setIsLoading(false);
  }
}, [products]);

  // Loading Spinner Component
  const LoadingSpinner = () => (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-white z-50 flex items-center justify-center"
    >
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 1.5,
          ease: "linear"
        }}
        className="w-16 h-16 border-4 border-main border-t-transparent rounded-full"
      />
    </motion.div>
  );

  return (
    <div className="bg-white">
      <AnimatePresence>
        {isLoading && <LoadingSpinner />}
      </AnimatePresence>

      {/* Hero Section with Motion */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative"
      >
        <Hero />
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="absolute top-4 right-4 bg-main text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg"
        >
          Summer Sale: 30% Off
        </motion.div>
      </motion.div>

      {/* Value Propositions with Staggered Animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-white to-gray-50 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 variants={slideUp} className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Shop With Us
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FiTrendingUp className="w-6 h-6 text-main" />,
                title: "Trending Styles",
                desc: "Curated collections updated weekly",
                bg: "bg-blue-50"
              },
              {
                icon: <FiAward className="w-6 h-6 text-main" />,
                title: "Premium Quality",
                desc: "Ethically sourced materials",
                bg: "bg-amber-50"
              },
              {
                icon: <FiShield className="w-6 h-6 text-main" />,
                title: "Secure Checkout",
                desc: "256-bit SSL encryption",
                bg: "bg-green-50"
              },
              {
                icon: <FiRefreshCw className="w-6 h-6 text-main" />,
                title: "Easy Returns",
                desc: "30-day hassle-free returns",
                bg: "bg-purple-50"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={slideUp}
                whileHover={{ y: -5 }}
                className={`${item.bg} p-6 rounded-xl hover:shadow-lg transition-all duration-300 cursor-default`}
              >
                <div className="flex items-start gap-4">
                  <motion.div 
                    whileHover={{ rotate: 10 }}
                    className={`p-3 rounded-lg ${item.bg.replace('50', '100')}`}
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <p className="mt-1 text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Category Slider */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        viewport={{ once: true }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 variants={slideUp} className="text-3xl font-bold text-center mb-12 text-gray-900">
            Shop by Category
          </motion.h2>
          
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 }
            }}
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 3000 }}
            className="mySwiper"
          >
            {[
              { 
                name: "Men's Collection", 
                image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "/collections"
              },
              { 
                name: "Women's Collection", 
                image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "/collections"
              },
              { 
                name: "New Arrivals", 
                image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "/collections"
              },
              { 
                name: "Bestsellers", 
                image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "/collections"
              }
            ].map((category, index) => (
              <SwiperSlide key={index}>
                <Link to={category.link} className="group relative overflow-hidden rounded-xl aspect-square block">
                  <motion.img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <h3 className="text-white font-medium text-lg">{category.name}</h3>
                  </div>
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-main px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      Shop Collection
                    </motion.button>
                  </motion.div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.div>

      {/* Product Collections with Motion */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true }}
        className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={slideUp} className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <div className="flex space-x-1 mt-4 md:mt-0 bg-gray-100 p-1 rounded-lg">
              {['All', 'Men', 'Women'].map((tab) => (
                <motion.button 
                  key={tab}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors ${
                    tab === 'All' 
                      ? 'bg-white shadow-sm text-main' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {tab}
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          <ProductDisplay />

          {productsContext.products ? (          
            <motion.div 
              variants={slideUp}
              className="text-center mt-8"
            >
              <Link 
                to="/collections" 
                className="px-6 py-3 bg-main text-white font-medium rounded-lg hover:bg-main/90 transition-colors flex items-center justify-center gap-2 mx-auto w-fit cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Products <FiArrowRight />
              </Link>
            </motion.div>
          ) : null}
        </div>
      </motion.div>

      {/* Promo Banner with Motion */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-main to-indigo-600 text-white py-12 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-4"
            whileInView={{ scale: [0.9, 1.03, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Limited Time Offer!
          </motion.h2>
          <motion.span 
            className="text-lg text-gray-200"
            whileInView={{ scale: [0.95, 1] }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            Get 20% off your first order with code WELCOME20
          </motion.span>
          <motion.div 
            className="flex items-center justify-center gap-2 my-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {['02', '14', '45'].map((time, index) => (
              <motion.div 
                key={index}
                variants={slideUp}
                whileHover={{ y: -5 }}
                className="bg-white/20 p-2 rounded-lg"
              >
                <span className="text-xl font-bold">{time}</span>
                <span className="text-xs block">
                  {index === 0 ? 'Days' : index === 1 ? 'Hours' : 'Mins'}
                </span>
              </motion.div>
            ))}
          </motion.div>
          <Link 
            to="/collections" 
            className="px-6 py-3 bg-white text-main font-medium rounded-lg hover:bg-gray-100 transition-colors inline-block cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now
          </Link>
        </div>
      </motion.div>

      {/* Enhanced Testimonials Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">What Our Clients Say</h2>
            <p className="text-lg text-gray-600">How Ecom Pro is transforming businesses</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={`${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'} w-5 h-5`} 
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <div className="px-4 py-2 bg-main/10 text-main rounded-lg inline-block">
                  <span className="font-medium">✓ {testimonial.highlight}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* New Minimalist Feature Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 mb-2"
            >
              Why Choose Ecom Pro
            </motion.h2>
            <motion.p
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600"
            >
              The complete solution for modern e-commerce
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiShoppingBag className="w-8 h-8 text-main" />,
                title: "Seamless Storefront",
                description: "Beautiful, responsive designs that convert visitors into customers"
              },
              {
                icon: <FiTrendingUp className="w-8 h-8 text-main" />,
                title: "Powerful Analytics",
                description: "Real-time data to help you make smarter business decisions"
              },
              {
                icon: <FiShield className="w-8 h-8 text-main" />,
                title: "Enterprise Security",
                description: "Bank-level encryption and fraud protection for your business"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <div className="bg-main/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link 
              to="/register" 
              className="inline-flex items-center px-6 py-3 bg-main text-white font-medium rounded-lg hover:bg-main/90 transition-colors"
            >
              Explore All Features <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;