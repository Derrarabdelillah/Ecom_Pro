import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden mt-10"
    >
      {/* Gradient Blur Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      {/* Glass Panel Effect */}
      <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-lg"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - About */}
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-main to-indigo-600 bg-clip-text text-transparent mb-4">Ecom Pro</h3>
            <p className="text-gray-600 text-sm">
              The complete e-commerce solution for modern businesses.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-600 hover:text-main transition">Home</a></li>
              <li><a href="/collections" className="text-gray-600 hover:text-main transition">Products</a></li>
              <li><a href="/about" className="text-gray-600 hover:text-main transition">About Us</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-main transition">Contact</a></li>
            </ul>
          </div>

          {/* Column 3 - Support */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-main transition">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-main transition">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-main transition">Terms of Service</a></li>
            </ul>
          </div>

          {/* Column 4 - Social */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
            <div className="flex space-x-4">
              <motion.a 
                href="https://web.facebook.com/Abdou.Dr.0001" 
                className="w-10 h-10 rounded-full bg-white bg-opacity-70 shadow-sm flex items-center justify-center text-gray-600 hover:text-white hover:bg-main transition"
                whileHover={{ y: -3 }}
              >
                <FaFacebookF />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/vegonix/" 
                className="w-10 h-10 rounded-full bg-white bg-opacity-70 shadow-sm flex items-center justify-center text-gray-600 hover:text-white hover:bg-main transition"
                whileHover={{ y: -3 }}
              >
                <FaInstagram />
              </motion.a>
              <motion.a 
                href="https://dz.linkedin.com/in/abdelillah-derrar-42a81635a" 
                className="w-10 h-10 rounded-full bg-white bg-opacity-70 shadow-sm flex items-center justify-center text-gray-600 hover:text-white hover:bg-main transition"
                whileHover={{ y: -3 }}
              >
                <FaLinkedinIn />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 border-opacity-50 flex flex-col md:flex-row justify-between items-center">
          <span className="text-sm text-gray-600">
            © {new Date().getFullYear()} <span className="bg-gradient-to-r from-main to-indigo-600 bg-clip-text text-transparent font-bold" >Ecom Pro.</span> All rights reserved.
          </span>
          <div className="flex flex-col md:flex-row space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-600 hover:text-main transition">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-600 hover:text-main transition">Terms of Service</a>
            <a href="https://web.facebook.com/Abdou.Dr.0001" className="text-sm text-gray-600 transition">Developer: <span className="font-bold bg-gradient-to-r from-main to-indigo-600 bg-clip-text text-transparent">Abdelillah Derrar</span></a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer