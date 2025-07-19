import { FiPackage, FiSettings, FiShoppingCart, FiTrendingUp, FiUsers } from "react-icons/fi"
import NavItem from "./NavItem"

const SideBar = () => {
  return (
    <div className="bg-white flex flex-col gap-4 shadow-xl w-full py-6 px-4 h-full rounded-b-lg ">

        <NavItem href={'/'} text="Dashbord" icon={FiTrendingUp} />
        <NavItem href={'/products'} text="Products" icon={FiPackage} />
        <NavItem href={'/orders'} text="Orders" icon={FiShoppingCart} />
        <NavItem href={'/users'} text="Users" icon={FiUsers} />
        <NavItem href={'/settings'} text="Settings" icon={FiSettings} />
        
    </div>
  )
}

export default SideBar
