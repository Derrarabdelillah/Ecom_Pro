import { FiPackage, FiSettings, FiShoppingCart, FiTrendingUp, FiUsers } from "react-icons/fi"
import NavItem from "./NavItem"
import { motion } from "framer-motion"

const SideBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white flex flex-col gap-1 w-full py-6 px-3 h-full border-r border-gray-200"
    >

      <NavItem
        href={'/'}
        text="Dashboard"
        icon={FiTrendingUp}
        className="hover:bg-indigo-100/50 text-gray-700 hover:text-indigo-600"
        activeClassName="bg-indigo-100 text-indigo-600 font-medium"
      />
      <NavItem
        href={'/products'}
        text="Products"
        icon={FiPackage}
        className="hover:bg-blue-100/50 text-gray-700 hover:text-blue-600"
        activeClassName="bg-blue-100 text-blue-600 font-medium"
      />
      <NavItem
        href={'/orders'}
        text="Orders"
        icon={FiShoppingCart}
        className="hover:bg-purple-100/50 text-gray-700 hover:text-purple-600"
        activeClassName="bg-purple-100 text-purple-600 font-medium"
      />
      <NavItem
        href={'/users'}
        text="Users"
        icon={FiUsers}
        className="hover:bg-green-100/50 text-gray-700 hover:text-green-600"
        activeClassName="bg-green-100 text-green-600 font-medium"
      />
      <NavItem
        href={'/settings'}
        text="Settings"
        icon={FiSettings}
        className="hover:bg-gray-100/50 text-gray-700 hover:text-gray-800"
        activeClassName="bg-gray-100 text-gray-800 font-medium"
      />
    </motion.div>
  )
}

export default SideBar