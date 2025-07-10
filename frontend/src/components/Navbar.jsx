import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaBars  } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6"
const Navbar = () => {
    
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);

    const nav = [
        {id: 1, href: "/", classname: "hover:text-main font-bold hover:ps-2", text: "Home"},
        {id: 2, href: "/shop", classname: "hover:text-main font-bold hover:ps-2", text: "Shop"},
        {id: 3, href: "/about", classname: "hover:text-main font-bold hover:ps-2", text: "About Us"},
        {id: 4, href: "/pricing", classname: "hover:text-main font-bold hover:ps-2", text: "Pricing"},
    ];

    const navList = nav.map( (item) => { return <Link key={item.id} to={item.href} className={item.classname}> {item.text} </Link> } );

    return (
        <>
            <header className="sticky bg-white border-b border-grayBorder top-0 shadow-xl z-9999">

                <div className="container w-full flex items-center justify-between text-black font-bold">

                        <div>
                                <Link href="/">
                                    {/* <image src={Logo} width={80} height={80} alt="Logo" className="whover:scale-105 cursor-pointer"/> */}
                                    <span className="text-2xl text-main">Ecom Pro</span>
                                </Link>
                        </div>

                        <div className="hidden md:flex gap-6">
                            {navList}
                        </div>

                        <div className="flex flex-row items-center gap-3 md:flex-row-reverse">
                            <button className="main-btn">Loign</button>
                            <div className="relative">
                                <FaBasketShopping className="text-2xl cursor-pointer" />
                                <span className="absolute bg-main w-[5px] h-[5px] rounded-full -top-1 right-0"></span>
                            </div>
                            {isMenuOpen ? <IoClose  className="md:hidden text-3xl cursor-pointer" onClick={ () => setIsMenuOpen(!isMenuOpen) }/> :  <FaBars className="md:hidden text-2xl cursor-pointer" onClick={ () => setIsMenuOpen(!isMenuOpen) }/>}
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