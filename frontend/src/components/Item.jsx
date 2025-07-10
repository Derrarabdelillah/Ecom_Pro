import { useState } from "react";
import { FaEye, FaMinus, FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";


const Item = ({product}) => {

    const [count, setCount] = useState(0);

    return (
        <>
            <div className="relative flex flex-col gap-1 border border-grayBorder rounded-lg hover:scale-101">
                {/* Image */}
                <img src={product.image} className="rounded-tl-lg rounded-tr-lg"  alt="" />
                
                <div className="flex flex-row gap-2 absolute right-2 bottom-35">
                        <span className="bg-white border-grayBorder cursor-pointer px-1 py-1 rounded-full   hover:scale-105">
                    <Link to={`/product/:${product._id}`} >
                            <FaEye />
                    </Link>
                        </span>

                        {!count ? 
                        ( <span className="bg-white border-grayBorder cursor-pointer px-1 py-1 rounded-full hover:scale-105">
                            <FaPlus onClick={ () => setCount((prev) => prev + 1) } />
                        </span> ) : (
                            <div className="flex gap-2 items-center bg-white rounded-full ">
                                <span className="bg-white border-grayBorder cursor-pointer px-1 py-1 rounded-full hover:scale-105">
                                    <FaMinus onClick={ () => setCount((prev) => prev - 1) } />
                                </span>
                                <p> {count} </p>
                                <span className="bg-main border-grayBorder cursor-pointer px-1 py-1 rounded-full hover:scale-105">
                                    <FaPlus onClick={ () => setCount((prev) => prev + 1) } />
                                </span>
                            </div>
                        )
                    }
                </div>

                <div className="p-2">
                    <div className="flex flex-row justify-between items-center">
                        <h3 className="text-gray-500 text-sm"> {product.category} </h3>
                        <h3 className="font-bold text-main"> {product.price}DA </h3>
                    </div>
                    <h3 className="font-medium line-clamp-2"> {product.name} </h3>
                    <p className="line-clamp-1"> {product.description} </p>
                </div>
            </div>
        </>
    )
} 

export default Item;