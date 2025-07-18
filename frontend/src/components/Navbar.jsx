import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoSearch } from "react-icons/io5";
import { FiUser, FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { productsContext } from "../context/ProductsContext";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const { getCartCount } = useContext(productsContext);
    const count = getCartCount();
    const navigate = useNavigate()
    const token = localStorage.getItem('token');

    const navItems = [
        { id: 1, to: "/", text: "Home" },
        { id: 2, to: "/collections", text: "Collections" },
        { id: 3, to: "/about", text: "About Us" },
        { id: 4, to: "/contact", text: "Contact" },
    ];

    const menuVariants = {
        open: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        },
        closed: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <motion.div whileHover={{ scale: 1.05 }}>
                    <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-main to-indigo-600 bg-clip-text text-transparent">
                        Ecom Pro
                    </Link>
                </motion.div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <motion.div
                            key={item.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                to={item.to}
                                className="text-gray-700 hover:text-main font-medium transition-colors duration-300 relative group"
                            >
                                {item.text}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-main transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </motion.div>
                    ))}
                </nav>

                {/* Icons Group */}
                <div className="flex items-center space-x-4">
                    {/* Search Icon */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            setShowSearch(!showSearch)
                            navigate('collections')
                        }}
                        className="text-gray-600 hover:text-main"
                    >
                        <IoSearch className="w-5 h-5" />
                    </motion.button>

                    {/* User Dropdown */}
                    <div className="relative group">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-1 cursor-pointer text-gray-600 hover:text-main"
                        >
                            <Link to="/login">
                                <FiUser className="w-5 h-5" />
                            </Link>
                        </motion.div>

                        {/* Dropdown Content */}
                        {token &&
                            <motion.div
                                initial="closed"
                                animate="closed"
                                whileHover="open"
                                className="absolute right-0 pt-2 w-40 origin-top-right"
                            >
                                <motion.div
                                    variants={menuVariants}
                                    className="bg-white rounded-md shadow-lg py-1 border border-gray-100"
                                >
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-main"
                                    >
                                        My Profile
                                    </Link>
                                    <Link
                                        to="/orders"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-main"
                                    >
                                        My Orders
                                    </Link>
                                    <button
                                        onClick={() => localStorage.clear()}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-main"
                                    >
                                        Logout
                                    </button>
                                </motion.div>
                            </motion.div>}
                    </div>

                    {/* Cart Icon */}
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="relative"
                    >
                        <Link
                            to="/cart"
                            className="text-gray-600 hover:text-main flex items-center"
                        >
                            <FiShoppingCart className="w-5 h-5" />
                            {count > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 bg-main text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                                >
                                    {count}
                                </motion.span>
                            )}
                        </Link>
                    </motion.div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="md:hidden text-gray-600"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <IoClose className="w-6 h-6" />
                        ) : (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
                    >
                        <div className="px-4 py-3 space-y-4">
                            {navItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Link
                                        to={item.to}
                                        className="block py-2 text-gray-700 hover:text-main font-medium"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.text}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Bar */}
            <AnimatePresence>
                {showSearch && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="w-full bg-gray-50 overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-3">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full px-4 py-2 pr-16 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
                                />

                                <div className="absolute right-3 flex space-x-2">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="text-gray-500 hover:text-main"
                                    >
                                        <IoSearch className="w-5 h-5" />
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setShowSearch(false)}
                                        className="text-gray-500 hover:text-red-500"
                                    >
                                        <IoClose className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;