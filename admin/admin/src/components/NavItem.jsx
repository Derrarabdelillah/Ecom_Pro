import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"

const NavItem = ({ href, text, icon: Icon, className, activeClassName }) => {
  return (
    <motion.div>
      <NavLink
        to={href}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${className} ${isActive ? activeClassName : ''
          }`
        }
      >
        <Icon className="w-5 h-5" />
        <span>{text}</span>
      </NavLink>
    </motion.div>
  )
}

export default NavItem