import { useState, useEffect } from 'react';
import { FiMenu, FiBell, FiSearch, FiUser, FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full shadow-md z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-sm py-2' : 'bg-white/90 backdrop-blur-sm py-3'}`}>
      <div className="container flex items-center justify-between">
        {/* Left section - Logo/Brand */}
        <div className="flex items-center">
          <button className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors">
            <FiMenu className="text-gray-600 text-xl" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">AdminPanel</h1>
        </div>

        {/* Center section - Search (expands on mobile) */}
        <div className={`flex-1 max-w-2xl mx-4 transition-all duration-300 ${searchOpen ? 'block' : 'hidden md:block'}`}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 px-4 pl-10 rounded-full border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-200 transition-all"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Right section - Icons */}
        <div className="flex items-center space-x-2">

          {/* Notifications */}
          <button className="p-2 relative rounded-full hover:bg-gray-100 transition-colors">
            <FiBell className="text-gray-600 text-xl" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile dropdown */}
          <div className="relative">
            <button 
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">A</div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">Admin User</p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <FiUser className="mr-2" /> Profile
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center">
                  <FiLogOut className="mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;