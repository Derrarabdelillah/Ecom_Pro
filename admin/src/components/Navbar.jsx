import { useState, useEffect } from 'react';
import { FiMenu, FiBell, FiSearch, FiUser, FiLogOut } from 'react-icons/fi';
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useParams } from 'react-router-dom';

const Navbar = ({ setToken }) => {
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const { id } = useParams();


  const getUserById = async () => {
    const userById = await axios.get(`${backendUrl}/api/users/admin/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (userById.data.success) {
      setUser(userById.data.admin);
    } else {
      toast.error('Failed to fetch user data.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
      );
    }
  }

  return (
    <header className={`sticky w-full py-6 px-4  z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-sm py-2' : 'bg-white/90 backdrop-blur-sm py-1'}`}>
      <div className="flex items-center justify-between">
        {/* Left section - Logo/Brand */}
        <div className="flex items-center gap-3">

          {/* <FiMenu className='rounded-full hover:bg-gray-100 transition-colors' /> */}
          <button className="p-2 rounded-full transition-all duration-300 hover:scale-105">
            <div className="w-8 h-8 rounded-full flex items-center justify-center 
              bg-gradient-to-tr from-main to-indigo-600 shadow-md">
              <MdOutlineAdminPanelSettings className="text-white text-lg" />
            </div>
          </button>

          <h1 className="text-xl font-semibold bg-gradient-to-r from-main to-indigo-600 
            bg-clip-text text-transparent tracking-tight">
            Admin Panel
          </h1>

        </div>

        {/* Center section - Search (expands on mobile) */}
        <div className={`flex-1 max-w-2xl mx-4 transition-all duration-300 hidden md:block`}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 px-4 pl-10 rounded-full border border-gray-200  focus:outline-none focus:ring-1 focus:ring-main transition-all"
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
              className="flex items-center space-x-2 p-1 group transition-all"
            >
              <div className="h-9 w-9 rounded-full flex items-center justify-center cursor-pointer 
                bg-gradient-to-tr from-main to-indigo-600 shadow-md
                transition-transform duration-300 group-hover:scale-105">
                <span className="text-white font-medium text-sm">A</span>
              </div>
            </button>


            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-100 overflow-hidden">
                <div className="px-4 py-3 bg-gradient-to-r from-main/5 to-indigo-600/5 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800"> {user?.username || "Guest User"} </p>
                  <p className="text-xs text-gray-500"> {user?.role || "User"} </p>
                </div>
                <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50/95 flex items-center gap-2 transition-colors">
                  <FiUser className="text-main opacity-80" />
                  <span className='cursor-pointer'>Profile Settings</span>
                </button>
                <button
                  onClick={() => setToken('')}
                  className="w-full cursor-pointer text-left px-4 py-2.5 text-sm text-red-600 hover:bg-gray-50/95 flex items-center gap-2 transition-colors">
                  <FiLogOut className="text-red-500 opacity-80" />
                  <span>Logout</span>
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