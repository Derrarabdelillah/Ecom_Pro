import { products } from "../assets/frontend_assets/assets"


const Product = () => {
  return (
    <div>
      {products.map((product) => {
        <h1>{product.name}</h1>
      })}
    </div>
  )
}

export default Product
