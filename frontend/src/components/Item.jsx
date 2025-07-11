import { Link } from "react-router-dom"




const Item = ({product}) => {
  return (
    <>
        <Link to={`/product/:${product._id}`} >
            <div className="flex flex-col gap-2" >
                <img src={product.image[0]} className="w-full" />
                <div className="flex flex-col">
                    <span className="text-sm text-gray-600"> {product.category} </span>
                    <span className="text-sm line-clamp-1"> {product.name} </span>
                    <span className="text-sm line-clamp-1 font-bold"> {product.price}$ </span>
                </div>
            </div>
        </Link>
    </>
  )
}

export default Item
