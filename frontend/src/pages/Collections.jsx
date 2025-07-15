import { useContext, useEffect, useState } from "react"
import { productsContext } from "../context/ProductsContext"
import Item from "../components/Item";
import { assets } from "../assets/frontend_assets/assets";
import SearchBar from "../components/SearchBar";

const Collections = () => {
  const { products, search, setSearch } = useContext(productsContext);
  const { currency } = useContext(productsContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProdcuts, setFilterProducts] = useState([])  ;
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent')
  
  // Category Toogle Funciton to store the clicked checkbox on the category useState
  const toggleCategory  = (e) => {
    
    if ( category.includes(e.target.value) ) {
      setCategory( prev => prev.filter(item => item !== e.target.value) )
    } else {
      setCategory(prev => [...prev, e.target.value])
    }

  }
  
  // SubCategory Toogle Funciton to store the clicked checkbox on the SubCategory useState
  const toggleSubCategory = (e) => {  
    if ( subCategory.includes(e.target.value) ) {
      setSubCategory( prev => prev.filter( item => item !== e.target.value ) )
    } else {
      setSubCategory( prev => [...prev, e.target.value] )
    }
  }

  // function to apply the filter after selecting the checkbox have been clicked
  const applyFilter = () => {
    let productsCopy = products.slice();

    if ( search ) {
      productsCopy = productsCopy.filter( item => item.name.toLowerCase().includes(search.toLowerCase()) )
    }

    if ( category.length > 0 ) {
      productsCopy = productsCopy.filter( item => category.includes(item.category) );
    }

    if ( subCategory.length > 0 ) {
      productsCopy = productsCopy.filter( item => subCategory.includes(item.subCategory) );
    }
    setFilterProducts(productsCopy)
  };

  const sortProducts = () => {
    let fpCopy = filterProdcuts.slice();

    switch (sortType) {
      case 'Low To High':
        setFilterProducts( fpCopy.sort( (a,b) => (a.price - b.price) ) );
        break;

        case 'High To Low':
        setFilterProducts( fpCopy.sort( (a,b) => (b.price - a.price) ) );

      default:
        applyFilter()
        break;
    }
  }
  
  // store the products to the useState
  useEffect( () => {
    setFilterProducts(products);
  },[])

  // apply Filter function when the category and subCategory have been changed
  useEffect( () => {
    applyFilter();
  }, [category, subCategory, search])

  useEffect( () => {
    sortProducts();
    console.log(sortType)
  }, [sortType] )
  

  return (
    <div className="container ">
      <SearchBar />
      <div className="flex flex-col gap-8 md:flex-row ">
        
        {/* Filter Options */}
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

        <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-row gap-2 items-center justify-between">
                  <h2 className="font-bold text-xl md:text-2xl uppercase">all collections</h2>
                <select 
                onChange={ (e) => setSortType(e.target.value) }
                className="bg-white font-bold text-sm border border-grayBorder rounded-lg px-2 py-2 cursor-pointer outline-none">
                  <option value="relavent" >Relavent</option>
                  <option value="Low To High" >Low To High</option>
                  <option value="High To Low" >High To Low</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {filterProdcuts.map( (product) => {
                        return (
                            <div >
                                <Item key={product._id} product={product} currency={currency} 
                                />
                            </div>
                        )
                    } )}
              </div>
        </div>

      </div>
    </div>
  )
}

export default Collections
