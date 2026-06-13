import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productsContext } from "../context/ProductsContext";
import { FaShoppingCart, FaStar, FaRegStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(productsContext);
  const [productData, setProductData] = useState();
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedAttributes, setSelectedAttributes] = useState({})

  const handlAddAttributeSelect = (attrName, value) => {
    setSelectedAttributes( prev => ( {
      ...prev,
      [attrName]: value
    } ) )
  }

  // get product by her ID
  const fetchProductData = async () => {
    products.map((product) => {
      if (products && productId) {
        if (product._id === productId) {
          setProductData(product);
          setImage(product.image[0]);
        }
      }
    })
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);


  const nextImage = () => {
    if (productData.image.length > currentImageIndex + 1) {
      setCurrentImageIndex(prev => prev + 1);
    } else {
      // Optional: Loop back to the first image
      setCurrentImageIndex(0);
    }
  };

  // display the prev image when click to the prev button
  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    } else {
      // Optional: Loop back to the last image
      setCurrentImageIndex(productData.image.length - 1);
    }
  };

  // add items to cart
  const handleAddToCart = () => {
    addToCart(productData._id, selectedAttributes);
    console.log(selectedAttributes);
    
  };

  return productData ? (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/*  */}
      <nav className="flex mb-6" aria-label="Breadcrumb">

        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a href="#" className="text-gray-700 hover:text-main text-sm font-medium">Home</a>
          </li>

          <li>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
              <a href="#" className="text-gray-700 hover:text-main ml-1 text-sm font-medium">{productData.category}</a>
            </div>
          </li>

          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
              <span className="text-gray-400 ml-1 text-sm font-medium">{productData.name}</span>
            </div>
          </li>

        </ol>

      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="w-full lg:w-1/2">
          <div className="relative bg-white rounded-xl shadow-md overflow-hidden mb-4">
            {productData.image?.[0] ? (
              <img
                src={productData.image[currentImageIndex]}
                alt={productData.name}
                className={`w-full h-96 object-contain p-4`}
              />)
              : (
                <div className="h-100 flex items-center justify-center bg-gray-200 text-main">
                  No Image
                </div>
              )
            }
            {productData.image.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  disabled={currentImageIndex === 0}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 disabled:opacity-50"
                >
                  <FaChevronLeft className="cursor-pointer text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  disabled={currentImageIndex === productData.image.length - 1}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 disabled:opacity-50"
                >
                  <FaChevronRight className="cursor-pointer text-gray-700" />
                </button>
              </>
            )}
          </div>

          {productData.image.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto py-2">
              {productData.image.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${currentImageIndex === index ? 'border-main' : 'border-transparent'}`}
                  onClick={() => {
                    setCurrentImageIndex(index);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{productData.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                i < 4 ? <FaStar key={i} /> : <FaRegStar key={i} />
              ))}
            </div>
            <span className="text-gray-600 text-sm">(42 reviews)</span>
          </div>

          <div className="mb-6">
            <span className="text-2xl font-bold text-gray-900">{productData.price} {currency}</span>
            {/* {productData.originalPrice && (
              <span className="text-lg text-gray-500 line-through ml-2">{currency}{productData.originalPrice}</span>
            )}
            {productData.discount && (
              <span className="bg-red-100 text-red-800 text-xs font-semibold ml-2 px-2.5 py-0.5 rounded">
                {productData.discount}% OFF
              </span>
            )} */}
          </div>

          <p className="text-gray-700 mb-6">{productData.description}</p>
          {/* Dynamic Attributes Section */}
          {productData.attributes.length > 0 && (
            <div className="mb-6">
              {productData.attributes.map((attr, idx) => (

                <div key={attr.name || idx} className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">{attr.name ? (attr.name).toLowerCase() : ''}</h3>

                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(attr.values) && attr.values.map((val, vIdx) => (
                      <button
                        key={vIdx}
                        className={`px-4 py-2 border rounded-md ${
                          selectedAttributes[attr.name] === val
                            ? 'bg-main text-white border-main'
                            : 'bg-white border-gray-300 hover:bg-gray-50'
                        }`}
                        onClick={() => handlAddAttributeSelect(attr.name, val)}
                        type="button"
                      >
                        {val}
                      </button>
                    ))}
                  </div>

                </div>

              ))}
            </div>
          )}
          {/* 
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Quantity</h3>
            <div className="flex items-center">
              <button
                className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b border-gray-300">{quantity}</span>
              <button
                className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div> */}

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              className="flex-1 bg-main cursor-pointer hover:bg-main-dark text-white py-3 px-6 rounded-lg font-bold flex items-center justify-center gap-3 transition-colors shadow-lg hover:shadow-main/30"
              onClick={handleAddToCart}
            >
              <FaShoppingCart />
              Add to Cart
            </button>
            <button className="cursor-pointer flex-1 bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-bold transition-colors">
              Buy Now
            </button>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center mb-2">
              <span className="text-gray-700 mr-2">Availability:</span>
              {productData.stock ? (
                <span className="inline-flex items-center px-2.5 py-2 rounded-full text-xs font-medium bg-green-50 text-green-800">In Stock ({productData.stock})</span>
              ) :
                <span className="inline-flex items-center px-2.5 py-2 rounded-full text-xs font-medium bg-red-50 text-red-800">No Products in Stock</span>
              }
            </div>
            <div className="flex items-center mb-2">
              <span className="text-gray-700 mr-2">Category:</span>
              <span className="font-semibold">{productData.category}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-2">SKU:</span>
              <span className="font-semibold">PRD-{productData._id.slice(0, 8)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description and Reviews */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button className="mr-8 py-4 px-1 border-b-2 border-main font-medium text-sm text-main">
              Description
            </button>
            <button className="mr-8 py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Reviews (42)
            </button>
            <button className="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Shipping & Returns
            </button>
          </nav>
        </div>

        <div className="py-8">
          <h3 className="text-lg font-semibold mb-4">Product Details</h3>
          <p className="text-gray-700 mb-6">
            {productData.longDescription || "An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="font-semibold mb-2">Features</h4>
              <ul className="list-disc list-inside text-gray-700">
                <li>High-quality materials</li>
                <li>Eco-friendly production</li>
                <li>Designed for comfort</li>
                <li>Machine washable</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Specifications</h4>
              <ul className="text-gray-700">
                <li className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Material</span>
                  <span>100% Cotton</span>
                </li>
                <li className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Weight</span>
                  <span>0.5 kg</span>
                </li>
                <li className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Dimensions</span>
                  <span>30 × 20 × 5 cm</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">You may also like</h2>
        <RelatedProducts
          key={productData._id}
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main"></div>
    </div>
  );
};

export default Product;