import { useContext } from "react"
import { productsContext } from "../context/ProductsContext"


const Cart = () => {

  const { products, currency, cartItems } = useContext(productsContext);

  return (
    <div>
      
    </div>
  )
}

export default Cart
