import { createContext, useState } from "react";
import { products } from "../assets/frontend_assets/assets";

export const productsContext = createContext();

const ProductsContext = ({children}) => {

    const currency = '$';
    const delivery_fee = 20; 
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch
    };
    
    return (
        <productsContext.Provider value={value}>
            {children}
        </productsContext.Provider>
    )
};

export default ProductsContext;