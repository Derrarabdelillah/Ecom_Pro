import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";

export const productsContext = createContext();

const ProductsContext = ({children}) => {

    const currency = '$';
    const delivery_fee = 20; 
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});

const addToCart = async (itemId, size) => {

    if ( !size ) {
        toast.error('Please Select The Size');
        return;
    } else {
        toast.success('The Product Have been added to your cart')
    }

    // 1. Create a deep copy of the current cart items
    let cartData = structuredClone(cartItems);

    // 2. Check if this item already exists in the cart (by its ID)
    if ( cartData[itemId] ) {
        // 3. If item exists, check if this specific size exists for this item
        if ( cartData[itemId][size] ) {
            // 4. If both item and size exist, increment quantity by 1
            cartData[itemId][size] += 1;
        } else {
            // 5. If item exists but not this size, add size with quantity 1
            cartData[itemId][size] = 1;
        }
    } else {
        // 6. If item doesn't exist in cart at all
        //    First create an empty object for this item
        cartData[itemId] = {};
        //    Then add the size with quantity 1
        cartData[itemId][size] = 1;
    }

    // 7. Update the cart state with the modified data
    setCartItems(cartData);
}

const getCartCount = () => {

    let totalCount = 0;

    for ( const productId in cartItems ) {
        for ( const size in cartItems[productId] ) {
            // add the quntity of our total
            totalCount += cartItems[productId][size]
        }
    }

    return totalCount;

}

    useEffect( () => {
        console.log(cartItems)
    },[cartItems] )

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        addToCart,
        cartItems,
        setCartItems,
        getCartCount
    };
    
    return (
        <productsContext.Provider value={value}>
            {children}
        </productsContext.Provider>
    )
};

export default ProductsContext;