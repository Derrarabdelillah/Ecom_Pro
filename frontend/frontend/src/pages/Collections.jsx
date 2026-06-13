import { useContext, useEffect, useState } from "react"
import { productsContext } from "../context/ProductsContext"
import Item from "../components/Item";
import { assets } from "../assets/frontend_assets/assets";
import SearchBar from "../components/SearchBar";

const Collections = () => {
  const { products, search, setSearch } = useContext(productsContext);
  const { currency } = useContext(productsContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent')

  // Category Toggle Function
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  // SubCategory Toggle Function
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  // Apply filters
  const applyFilter = () => {
    let productsCopy = products.slice();

    if (search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }
    setFilterProducts(productsCopy)
  };

  // Sort products
  const sortProducts = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'Low To High':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'High To Low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  }

  // Initialize with all products
  useEffect(() => {
    setFilterProducts(products);
  }, [products])

  // Apply filters when dependencies change
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, products])

  // Sort when sort type changes
  useEffect(() => {
    sortProducts();
  }, [sortType])

  return (
    <div className="container ">
      <SearchBar />
      <div className="flex flex-col gap-8 md:flex-row ">

        {/* Filter Options - FULL CODE INCLUDED */}
        <div className="flex flex-col gap-4 min-w-60 ">
          <div className="flex flex-row gap-2 items-center">
            <h2 className="font-bold text-2xl uppercase">filter</h2>
            <img
              onClick={() => setShowFilter(!showFilter)}
              src={assets.dropdown_icon}
              className={`md:hidden ${showFilter ? 'rotate-90' : ''} w-2.5 cursor-pointer`}
            />
          </div>

          <div className={`${showFilter ? '' : 'hidden'} md:flex flex-col gap-4 space-y-4 md:space-y-0`}>
            {/* Category Options */}
            <div className="flex flex-col gap-2 border border-grayBorder rounded-lg px-6 py-4">
              <h3 className="font-bold text-sm uppercase">categories</h3>

              <div className="flex flex-row gap-2">
                <input type="checkbox" className="w-3" value={"Men"} onChange={toggleCategory} />
                <p>Men</p>
              </div>

              <div className="flex flex-row gap-2">
                <input type="checkbox" className="w-3" value={"Women"} onChange={toggleCategory} />
                <p>Women</p>
              </div>

              <div className="flex flex-row gap-2">
                <input type="checkbox" className="w-3" value={"Kids"} onChange={toggleCategory} />
                <p>Kids</p>
              </div>
            </div>

            {/* Sub Category Options */}
            <div className="flex flex-col gap-2 border border-grayBorder rounded-lg px-6 py-4">
              <h3 className="font-bold text-sm uppercase">type</h3>

              <div className="flex flex-row gap-2">
                <input type="checkbox" className="w-3" value={"Topwear"} onChange={toggleSubCategory} />
                <p>Topwear</p>
              </div>

              <div className="flex flex-row gap-2">
                <input type="checkbox" className="w-3" value={"Bottomwear"} onChange={toggleSubCategory} />
                <p>Bottomwear</p>
              </div>

              <div className="flex flex-row gap-2">
                <input type="checkbox" className="w-3" value={"Winterwear"} onChange={toggleSubCategory} />
                <p>Winterwear</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Display Area */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row gap-2 items-center justify-between">
            <h2 className="font-bold text-xl md:text-2xl uppercase">all collections</h2>
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="bg-white font-bold text-sm border border-grayBorder rounded-lg px-2 py-2 cursor-pointer outline-none">
              <option value="relavent">Relavent</option>
              <option value="Low To High">Low To High</option>
              <option value="High To Low">High To Low</option>
            </select>
          </div>

          {/* No Products Message */}
          {filterProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-center">
                <svg className="w-20 h-20 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
                <p className="mt-2 text-gray-600">
                  {search
                    ? `No matches for "${search}"`
                    : "Try adjusting your filters"}
                </p>
                <button
                  onClick={() => {
                    setSearch('');
                    setCategory([]);
                    setSubCategory([]);
                  }}
                  className="mt-4 px-4 py-2 bg-main text-white rounded-md hover:bg-main-dark transition"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {filterProducts.map((product) => (
                <div key={product._id}>
                  <Item product={product} currency={currency} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Collections