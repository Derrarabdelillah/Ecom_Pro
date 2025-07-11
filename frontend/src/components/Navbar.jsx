import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaBars, FaSearch, FaUser  } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";

const Navbar = () => {
    
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);

    const nav = [
        {id: 1, href: "/", classname: "hover:text-main font-bold hover:ps-2", text: "Home"},
        {id: 2, href: "/", classname: "hover:text-main font-bold hover:ps-2", text: "Collections"},
        {id: 3, href: "/", classname: "hover:text-main font-bold hover:ps-2", text: "About Us"},
        {id: 4, href: "/", classname: "hover:text-main font-bold hover:ps-2", text: "Contact"},
    ];

    const navList = nav.map( (item) => { return <Link key={item.id}  className={item.classname}> {item.text} </Link> } );

    const [box, setBox] = useState(false);
    const handlBox = () => {
        setBox(true);
    }
    return (
        <>
            <header className="sticky bg-white border-b border-grayBorder top-0 shadow-xl z-9999">

                <div className="container w-full flex items-center justify-between text-black font-bold">

                        <div>
                                <Link href="/">
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
                                <FaUser className=" text-xl" />
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
                                    <FaBasketShopping className=" text-2xl cursor-pointer" />
                                </Link>
                                <span className="absolute bg-main w-[5px] h-[5px] rounded-full -top-1 right-0"></span>
                            </div>
                                <Link to={"/search"} >
                                    <FaSearch className=" text-2xl cursor-pointer" />
                                </Link>
                            {isMenuOpen ? 
                            <IoClose  className="md:hidden text-3xl cursor-pointer" 
                            onClick={ () => setIsMenuOpen(!isMenuOpen) }/> 
                            :  
                            <FaBars className=" md:hidden text-2xl cursor-pointer" onClick={ () => setIsMenuOpen(!isMenuOpen) }/>}
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