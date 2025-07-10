import { createContext } from "react";
import { all_products } from "../assets/data";

export const ShopContext = createContext({all_products});

const ShopContextProvider = ({ children }) => {
    const contextValue = {all_products};

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;