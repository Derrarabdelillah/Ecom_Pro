import { useContext } from "react"
import { productsContext } from "../context/ProductsContext"

import Item from "./Item";



const ProductDisplay = () => {
    const products = useContext(productsContext);

    const bestSellers = products.filter( (product) => product.bestseller === true )
  
    return (
    <div className="flex flex-col gap-4 justify-center items-center">
       <div className="flex flex-col items-center text-center gap-2 md:w-[80%]">
            <h2 className="font-bold text-2xl uppercase">latest collections</h2>
            <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui asperiores perspiciatis necessitatibus totam, eius sequi exercitationem consequuntur suscipit! Culpa adipisci repellat commodi alias sit qui quae! Saepe iste labore architecto?</p>
       </div>

       <div className="grid gap-8 grid-cols-2 md:grid-cols-4 ">
            {products.map( (product) => {
        return (
            <div >
                <Item key={product._id} product={product} />
            </div>
        )
    } )}
       </div>

       <div className="flex flex-col items-center text-center gap-2 md:w-[80%]">
            <h2 className="font-bold text-2xl uppercase">best seller</h2>
            <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui asperiores perspiciatis necessitatibus totam, eius sequi exercitationem consequuntur suscipit! Culpa adipisci repellat commodi alias sit qui quae! Saepe iste labore architecto?</p>
       </div>

       <div className="grid gap-8 grid-cols-2 md:grid-cols-4 ">
            {bestSellers.map( (product) => {
                return (
                    <Item key={product._id} product={product} />
                )
            } )}
       </div>

    </div>
  )
}

export default ProductDisplay
