import { Link } from "react-router-dom"

const Item = ({product, currency}) => {
  return (
    <>
        <Link to={`/product/${product._id}`} >
            <div className="flex flex-col gap-2 bg-white border border-grayBorder rounded-lg hover:scale-103" >
                <img src={product.image[0]} className="w-full rounded-lg" />
                <div className="flex flex-col px-2 py-2">
                    <span className="text-sm text-gray-600"> {product.category} </span>
                    <span className="text-sm line-clamp-1"> {product.name} </span>
                    <span className="text-sm line-clamp-1 font-bold"> {product.price}{currency} </span>
                </div>
            </div>
        </Link>
    </>
  )
}

export default Item
