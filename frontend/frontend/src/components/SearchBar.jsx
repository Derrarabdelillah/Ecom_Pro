import { useContext } from "react"
import { productsContext } from "../context/ProductsContext";
import { assets } from "../assets/frontend_assets/assets";



const SearchBar = () => {

  const { search, setSearch, showSearch, setShowSearch } = useContext(productsContext);

  return showSearch ? (
    <div className="bg-gray-100 mb-4 rounded-lg px-6 py-4 text-center border border-grayBorder">

      <div className="flex flex-row  justify-center items-center">

        <div className="relative flex flex-row gap-2 items-center">
          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
            placeholder="Search..."
            type="text"
            className="w-full md:w-100 bg-white border border-grayBorder px-4 py-2 rounded-full outline-none text-sm " />
          <img src={assets.search_icon} className="w-4 absolute right-4" />
          <img src={assets.cross_icon} onClick={() => setShowSearch(false)} className="w-4 cursor-pointer absolute -right-6" />
        </div>

      </div>

    </div>
  ) : null
}

export default SearchBar
