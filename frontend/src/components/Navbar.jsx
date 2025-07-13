import { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import { productsContext } from "../context/ProductsContext";

const Navbar = () => {
    
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const { setShowSearch, getCartCount, cartItems} = useContext(productsContext);
    const count = getCartCount();
    
    const nav = [
        {id: 1, to: "/", classname: "hover:text-main font-bold hover:ps-2", text: "Home"},
        {id: 2, to: "/collections", classname: "hover:text-main font-bold hover:ps-2", text: "Collections"},
        {id: 3, to: "/about", classname: "hover:text-main font-bold hover:ps-2", text: "About Us"},
        {id: 4, to: "/contact", classname: "hover:text-main font-bold hover:ps-2", text: "Contact"},
    ];

    const navList = nav.map( (item) => { return <Link key={item.id}  className={item.classname} to={item.to} > {item.text} </Link> } );


    return (
        <>
            <header className="sticky bg-white border-b border-grayBorder top-0 shadow-xl z-9999">

                <div className="container w-full flex items-center justify-between text-black font-bold">

                        <div>
                                <Link to="/">
                                    <span className="text-2xl text-main">Ecom Pro</span>
                                </Link>
                        </div>

                        <div className="hidden md:flex gap-6">
                            {navList}
                        </div>

                        <div className="flex flex-row items-center gap-3 md:flex-row-reverse">

                        {/* User Dropdown */}
                        <div className="relative group">
                            <div className="p-2 cursor-pointer">
                                <img src={assets.profile_icon} className="w-5" />
                            </div>

                            {/* Dropdown Content */}
                            <div className="absolute hidden group-hover:block right-0 pt-4 w-36">
                                <div className="flex flex-col bg-white rounded-lg border border-grayBorder shadow-lg py-3 px-5">
                                    <Link to="/profile" className="py-1 font-medium hover:text-main">My Profile</Link>
                                    <Link to="/orders" className="py-1 font-medium hover:text-main">My Orders</Link>
                                    <Link to="/logout" className="py-1 font-medium hover:text-main">Logout</Link>
                                </div>
                            </div>
                        </div>

                            <div className="relative">
                                <Link to={"/cart"} >
                                    <img src={assets.cart_icon} className="w-5" />
                                </Link>
                                {cartItems ? (
                                    <span className="  text-white font-bold">
                                        <span className="absolute -top-4 -right-2 bg-main rounded-full text-xs px-1 ">{count}</span>
                                    </span>
                                ) : ''
                            }
                            </div>

                                <Link to={"/collections"} >
                                    <img 
                                    onClick={ () => setShowSearch(true) }
                                    src={assets.search_icon} 
                                    className="w-5" />
                                </Link>
                            {isMenuOpen ? 
                            <IoClose  className="md:hidden text-3xl cursor-pointer" 
                            onClick={ () => setIsMenuOpen(!isMenuOpen) }/> 
                            :  
                            <img src={assets.menu_icon} className=" md:hidden w-4 cursor-pointer" onClick={ () => setIsMenuOpen(!isMenuOpen) }/>}
                        </div>

                </div>

                    <div className={`border border-gray-200 shadow-xl py-4 absolute md:hidden left-0 w-full bg-white flex flex-col items-center gap-6 font-bold transform transition-transform ${isMenuOpen ? "top-20" : "-top-100"}`}
                     style={{transition: "transform 0.3s ease, opacity 0.3s ease"}}>
                            {navList}
                    </div>
            
            </header>
        </>
    )
};

export default Navbar;