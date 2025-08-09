import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Gradient Header - Using your requested gradient */}
        <div className="bg-gradient-to-r from-main to-indigo-600 p-6 sm:p-8 text-center text-white relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-1/4 left-1/4 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white"></div>
            <div className="absolute bottom-1/3 right-1/4 w-28 h-28 sm:w-40 sm:h-40 rounded-full bg-white"></div>
          </div>

          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10 }}
            className="inline-block mb-3 sm:mb-4"
          >
            <FiMail className="inline-block" size={32} />
          </motion.div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Contact Us</h1>
          <span className="opacity-90 max-w-2xl mx-auto text-blue-100 text-sm sm:text-base">
            We'd love to hear from you! Send us a message or reach out directly.
          </span>
        </div>

        {/* Contact Content */}
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          {/* Contact Information */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4 sm:space-y-6"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">Get in Touch</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Have questions about our platform? Want to discuss partnership opportunities?
              Fill out the form or contact us directly.
            </p>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="text-main bg-blue-100 p-2 sm:p-3 rounded-full">
                  <FiMail size={18} className="sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Email Us</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">derrarabdelillah57@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="text-main bg-blue-100 p-2 sm:p-3 rounded-full">
                  <FiPhone size={18} className="sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Call Us</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">+213 798-50-71-60</p>
                </div>
              </div>
            </div>

            <div className="pt-2 sm:pt-4">
              <h3 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">Follow Us</h3>
              <div className="flex gap-3 sm:gap-4">
                <motion.a
                  href="https://web.facebook.com/Abdou.Dr.0001"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-main hover:text-white transition-colors text-gray-700"
                >
                  <FaFacebookF className="text-sm sm:text-base" />
                </motion.a>

                <motion.a
                  href="https://dz.linkedin.com/in/abdelillah-derrar-42a81635a"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-main hover:text-white transition-colors text-gray-700"
                >
                  <FaLinkedinIn className="text-sm sm:text-base" />
                </motion.a>

                <motion.a
                  href="https://www.instagram.com/vegonix/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 hover:bg-main hover:text-white transition-colors text-gray-700 flex items-center justify-center"
                  whileHover={{ y: -3 }}
                >
                  <FaInstagram className="text-sm sm:text-base" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Send Us a Message</h2>
            <form className="space-y-3 sm:space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FiUser size={16} className="sm:w-4 sm:h-4" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    className="pl-9 sm:pl-10 w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FiMail size={16} className="sm:w-4 sm:h-4" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    className="pl-9 sm:pl-10 w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <div className="relative">
                  <div className="absolute top-2 sm:top-3 left-3 text-gray-400">
                    <FiMessageSquare size={16} className="sm:w-4 sm:h-4" />
                  </div>
                  <textarea
                    id="message"
                    rows="3"
                    className="pl-9 sm:pl-10 w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-main to-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg hover:shadow-md transition-all flex items-center justify-center gap-2 font-medium"
              >
                Send Message <FiSend size={16} className="sm:w-4 sm:h-4" />
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-t border-gray-100 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} Contact. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;