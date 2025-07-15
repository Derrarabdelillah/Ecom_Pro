import { useContext } from "react"
import { productsContext } from "../context/ProductsContext"

const TotalCart = ({widt}) => {
  const { getCartAmount, delivery_fee, currency } = useContext(productsContext);
  const subTotal = getCartAmount() + delivery_fee;

    return (
    <div className={`md:${widt} flex  flex-col`} >
      <h2 className="text-2xl font-bold" >Cart Total</h2>

      <div className="flex flex-col gap-2 my-4">
        
        <div className="flex flex-row justify-between border-b border-grayBorder py-2">
            <h2>Subtotal</h2>
            <span> {getCartAmount()}.00{currency} </span>
        </div>
                
        <div className="flex flex-row justify-between border-b border-grayBorder py-2">
            <h2>Shipping Fee</h2>
            <span> {delivery_fee}.00{currency} </span>
        </div>
                
        <div className="flex flex-row justify-between border-b border-grayBorder py-2 font-bold">
            <h2 className="">Total</h2>
            <span> {subTotal}.00{currency} </span>
        </div>

      </div>
    </div>
  )
}

export default TotalCart
