import { FaArrowRight } from "react-icons/fa6"
import { Link } from "react-router-dom"
const Button = ({btnName, btnOff, background, textC, direction}) => {
    return (
        <>
        <Link to={direction}>
                            <div className={`flex flex-row gap-3 items-center bg-${background} justify-center rounded-lg font-bold px-4 py-3 cursor-pointer hover:scale-101 border border-grayBorder`}>
                                <div className="flex flex-col text-sm">
                                    <button className={`uppercase text-${textC}`}> {btnName} </button>
                                    <span className="font-medium text-gray-500"> {btnOff} </span>
                                </div>

                                <span className="bg-grayBorder px-2 py-2 rounded-full">
                                    <FaArrowRight />
                                </span>
                            </div>
        </Link>
        </>
    )
};

export default Button;