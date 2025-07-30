import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center text-white relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white"></div>
            <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-white"></div>
          </div>
          
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10 }}
            className="inline-block mb-4"
          >
            <FiMail className="inline-block" size={40} />
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
          <span className="opacity-90 max-w-2xl mx-auto text-blue-100">
            We'd love to hear from you! Send us a message or reach out directly.
          </span>
        </div>

        {/* Contact Content */}
        <div className="p-8 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Information */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Get in Touch</h2>
            <p className="text-gray-600">
              Have questions about our platform? Want to discuss partnership opportunities? 
              Fill out the form or contact us directly.
            </p>

            <div className="space-y-4">

              <div className="flex items-start gap-4">
                <div className="text-blue-600 bg-blue-100 p-3 rounded-full">
                  <FiMail size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email Us</h3>
                  <p className="text-gray-600">derrarabdelillah57@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-blue-600 bg-blue-100 p-3 rounded-full">
                  <FiPhone size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Call Us</h3>
                  <p className="text-gray-600">+213 798-50-71-60</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="font-semibold text-gray-800 mb-3">Follow Us</h3>
              <div className="flex gap-4">
                <motion.a
                  href="https://web.facebook.com/Abdou.Dr.0001"
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-blue-600 hover:text-white transition-colors text-gray-700"
                >
                  <FaFacebookF className="text-lg" />
                </motion.a>
                
                <motion.a
                  href="https://dz.linkedin.com/in/abdelillah-derrar-42a81635a"
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-blue-600 hover:text-white transition-colors text-gray-700"
                >
                  <FaLinkedinIn className="text-lg" />
                </motion.a>

                <motion.a 
                  href="https://www.instagram.com/vegonix/" 
                  className="w-10 h-10 rounded-full bg-white bg-opacity-70 shadow-sm flex items-center justify-center text-gray-600 hover:text-white hover:bg-main transition"
                  whileHover={{ y: -3 }}
                >
                  <FaInstagram />
                </motion.a>

              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-50 p-6 rounded-xl border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FiUser size={18} />
                  </div>
                  <input
                    type="text"
                    id="name"
                    className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FiMail size={18} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <div className="relative">
                  <div className="absolute top-3 left-3 text-gray-400">
                    <FiMessageSquare size={18} />
                  </div>
                  <textarea
                    id="message"
                    rows="4"
                    className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:shadow-md transition-all flex items-center justify-center gap-2 text-sm font-medium"
              >
                Send Message <FiSend />
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ContactAge. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;