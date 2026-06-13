import { useContext, useEffect, useState } from "react"
import { productsContext } from "../context/ProductsContext"
import Item from "./Item";


const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(productsContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    let productsCopy = products.slice();

    if (products.length > 0) {
      productsCopy = productsCopy.filter((product) => category === product.category);
      productsCopy = productsCopy.filter((product) => subCategory === product.subCategory);
      setRelated(productsCopy);
    }
  }, [products])

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl uppercase text-center">related products</h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-5 my-5">
        {related.slice(0, 5).map((product) => (
          <div className="">
            <Item product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
