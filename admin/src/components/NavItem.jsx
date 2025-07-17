import { Link } from "react-router-dom"


const NavItem = ({href, text, icon: Icon}) => {
  return (
    <div>
        <Link to={href} >
            <div className="flex flex-row items-center gap-3 px-2 py-2 rounded-lg text-gray-800 hover:bg-gray-100">
                <Icon className="w-6 h-6"  />
                <span className="hidden md:block font-bold text-lg" >{text}</span>
            </div>
        </Link>
    </div>
  )
}

export default NavItem
