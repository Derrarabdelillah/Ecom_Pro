import { useNavigate } from "react-router-dom"
import { assets } from "../assets/frontend_assets/assets"
import TotalCart from "../components/TotalCart"


const CheckOut = () => {
  const navigate = useNavigate()
  return (
    <div className="container flex flex-col gap-3 my-5" >
        <h2 className="text-2xl font-bold" >Delivery Informations</h2>

      <div className="flex flex-col md:flex-row items-center gap-12" >
        
        <div className="flex flex-col gap-3 md:w-1/2">

          <div className="flex flex-row gap-3">
            <input type="text" className="w-full border border-grayBorder px-4 py-2 rounded-lg outline-none " placeholder="First Name" />
            <input type="text" className="w-full border border-grayBorder px-4 py-2 rounded-lg outline-none " placeholder="Last Name" />
          </div>

            <input type="email" className="w-full border border-grayBorder px-4 py-2 rounded-lg outline-none " placeholder="Email Address" />
            <input type="text" className="w-full border border-grayBorder px-4 py-2 rounded-lg outline-none " placeholder="Street  " />

          <div className="flex flex-row gap-3">
            <input type="text" className="w-full border border-grayBorder px-4 py-2 rounded-lg outline-none " placeholder="City" />
            <input type="text" className="w-full border border-grayBorder px-4 py-2 rounded-lg outline-none " placeholder="State" />
          </div>
          
          <div className="flex flex-row gap-3">
            <input type="number" className="w-full border border-grayBorder px-4 py-2 rounded-lg outline-none " placeholder="ZipCode" />
            <input type="text" className="w-full border border-grayBorder px-4 py-2 rounded-lg outline-none " placeholder="Country" />
          </div>

            <input type="number" className="w-full border border-grayBorder px-4 py-2 rounded-lg outline-none " placeholder="Phone" />
        </div>

        <div className="flex flex-col gap-3 w-full md:w-1/2">
      <TotalCart widt='w-100' />

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold uppercase" >Payment method</h2>
        <span className="flex flex-row gap-2 items-center uppercase font-bold text-lg text-gray-600">
          <input type="radio" className="w-5 h-5" />
          cash on delivery
        </span>
        
      </div>

      <button 
        onClick={ () => navigate('/orders') }
        className="w-full text-center px-4 py-2 bg-main text-white font-bold rounded-lg cursor-pointer uppercase">
        place order
      </button>

        </div>

      </div>

    </div>
  )
}

export default CheckOut
