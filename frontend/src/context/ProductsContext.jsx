import { createContext, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const productsContext = createContext();

const ProductsContext = ({children}) => {

    const currency = '$';
    const delivery_fee = 20; 
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});

    const navigate = useNavigate();
    const addToCart = async (itemId, size) => {

    if ( !size ) {
        toast.error('Please Select The Size');
        return;
    } else {
        toast.success('The Product Have been added to your cart');
        
        setTimeout(() => {
            navigate('/cart');
        }, 3000);
        
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

// This function will get the total amount of the cart items.
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

const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
}

const getCartAmount = () => {
    let totalAmount = 0;
    for ( const items in cartItems ) {
        let productInfo = products.find( (product) => product._id === items);

        for ( const item in cartItems[items] ) {
            try {
                if ( cartItems[items][item] > 0 ) {
                    totalAmount += ( productInfo.price ) * ( cartItems[items][item] )
                }
            } catch (error) {
                
            }
        }
    }
    return totalAmount;
}

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
        getCartCount,
        updateQuantity,
        getCartAmount
    };
    
    return (
        <productsContext.Provider value={value}>
            {children}
        </productsContext.Provider>
    )
};

export default ProductsContext;