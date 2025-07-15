import { useContext, useEffect, useState } from "react"
import { productsContext } from "../context/ProductsContext"
import { assets } from "../assets/frontend_assets/assets";
import TotalCart from "../components/TotalCart";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const navigate = useNavigate();
  const { products, currency, cartItems, updateQuantity } = useContext(productsContext);
  const [cartData, setCartData] = useState([]);
  useEffect( () => {
    const tempData = [];

    for ( const items in cartItems ) {
      for ( const inSize in cartItems[items] ) {
        if ( cartItems[items][inSize] > 0 ) {
          tempData.push({
            _id: items,
            size: inSize,
            quantity: cartItems[items][inSize]
          })
        }
      }
    }
    
    setCartData(tempData);
  },[cartItems] )

  return  (

    <div className="container flex flex-col gap-8 my-5">

      <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold" >Your Cart</h2>
      {
        cartData.map( (product, index) => {
          const productData = products.find( (prod) => prod._id === product._id );

          return (
            <div key={index} className="flex flex-col md:flex-row md:items-center md:justify-between py-4 px-2 border-b border-grayBorder " >
              
              <div className="flex flex-row gap-2">
                <img src={productData.image[0]} className="w-20"/>

                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-bold" > {productData.name} </h2>

                  <div className="flex flex-row items-center gap-4">
                    <span > {productData.price}{currency} </span>
                    <span className={`p-2 border rounded-md font-bold text-sm bg-white border-gray-300 hover:bg-gray-50`}> {product.size} </span>
                  </div>

                </div>

              </div>

              <div className="flex flex-row gap-4 items-center justify-end md:flex-row">
                
                <div>
                  <input 
                  onChange={ (e) => {
                    e.target.value === '0' || e.target.value === '' ? null : updateQuantity(product._id, product.size, Number(e.target.value))
                  } }
                  className="border border-grayBorder px-2 py-2 rounded-lg w-20"
                  type="number" 
                  min={1} 
                  defaultValue={product.quantity} />
              </div>

              <div>
                <img onClick={() => updateQuantity(product._id, product.size, 0)} src={assets.bin_icon} className="w-4 cursor-pointer hover:scale-105" />
              </div>

              </div>
            </div>
          )
        } )
      }
        </div>     

            <div className="flex flex-col md:w-100 justify-end" >
              <TotalCart widt='w-full' />
              <button 
              onClick={ () => navigate('/checkout') }
              className="w-full text-center px-4 py-2 bg-main text-white font-bold rounded-lg cursor-pointer">place order</button>
            </div>

    </div>
  ) 
}

export default Cart
