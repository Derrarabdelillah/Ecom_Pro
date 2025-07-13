import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { productsContext } from "../context/ProductsContext";
import { assets } from "../assets/frontend_assets/assets";
import { FaShoppingCart } from "react-icons/fa";
import RelatedProducts from "../components/RelatedProducts";



const Product = () => {

  const { productId } = useParams();
  const { products,currency, addToCart } = useContext(productsContext);
  const [ productData, setProductData ] = useState()
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');


  const fetchProductData = async () => {
    products.map( (product) => {

      if ( products && productId ) {
        if ( product._id === productId ) {
          setProductData(product);
          setImage(product.image[0]);
        }
      }
      
    } )
  }


useEffect(() => {
  fetchProductData();
}, [productId, products]);


  return productData ? (
    <div className="container transition-opacity ease-in duration-500 opacity-100" >
      <div className="flex flex-col gap-2">

      <div className="flex flex-col md:flex-row gap-2">

          <div className="flex flex-col-reverse md:flex-row">

              <div className="flex flex-col-reverse gap-2 md:flex-row">

                <div className="flex flex-col-reverse md:flex-row py-2">
                  
                  <div className={`flex flex-row py-2 px-2 gap-2 md:flex-col justify-between ${productData.image.length > 1 ? "overflow-x-scroll md:overflow-x-hidden md:overflow-y-scroll" : ''} `}>
                    {productData.image.length > 1 ? (
                                      productData.image.map((img, index) => (
                        <img 
                          key={index} // Required for React loops
                          src={img} 
                          alt={`Product view ${index + 1}`} 
                          className="w-30 h-25 md:w-30 md:h-full object-contain cursor-pointer"
                          onClick={ () => {
                            setImage(img)
                          } }
                        />
                      ))
                    ) : null}
                    </div>

                  <div className="w-full px-2">
                    <img src={image} className="cursor-pointer object-contain"/>
                  </div>

                </div>
                

              </div>

          </div>

          <div className="flex flex-col gap-3 md:w-[50%]">
            <h2 className="text-xl md:text-2xl font-bold">{productData.name}</h2>
            <h2 className="text-lg text-gray-500">Category: {productData.category}</h2>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <img 
                    key={i} 
                    src={assets.star_icon} 
                    className="w-4" 
                    alt={`Star ${i+1}`}
                  />
                ))}
              </div>
            
            <h2 className="text-xl md:text-2xl font-bold">{productData.price}{currency} </h2>
            <p> {productData.description} </p>

            <div className="flex flex-col gap-2 my-2">
              <h2 className="text-xl">Select Size</h2>

              <div className="flex flex-row gap-2">
                {productData.sizes.map( (item, index) => {
                  return <button 
                  className={`bg-white rounded-lg border border-grayBorder p-2 cursor-pointer ${size === item ? 'border-main ' : ''} `}
                  onClick={() => setSize(item)} 
                  key={index}
                  > {item} </button>
                } )}
              </div>

            </div>

            <div className="flex flex-col gap-2 md:flex-row my-2">
              <button
                className="w-full cursor-pointer  bg-main hover:bg-main-dark text-white py-4 px-6 rounded-lg font-bold flex items-center justify-center gap-3 transition-colors shadow-lg hover:shadow-main/30"
                onClick={() => addToCart(productData._id, size)}
              >
                <FaShoppingCart />
                Add to Cart
              </button>
            </div>

            <div className="flex flex-col border-t border-grayBorder py-2">
              <p className="text-sm" >100% Original Product</p>
              <p className="text-sm" >Cash on delivery is available on this product.</p>
            </div>

          </div>

      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <span className="font-bold text-sm px-4 py-2 border border-grayBorder rounded-lg">Description</span>
          <span className="font-bold text-sm px-4 py-2 border border-grayBorder rounded-lg">Reviews (122)</span>
        </div>

        <div className="px-6 py-4 border border-grayBorder rounded-lg text-sm" >
          <p > An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
              E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information. 
              </p>
        </div>

        <div className="">
            <RelatedProducts key={productData._id} category={productData.category} subCategory={productData.subCategory} />
        </div>
      </div>

      </div>
    </div>
  ) :
  <p>Loading product...</p>
}

export default Product
