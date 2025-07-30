import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const productsContext = createContext();

// List of all 58 Algerian wilayas with delivery fees
const algerianWilayas = [
    { id: 1, name: "Adrar", name_ar: "أدرار", fee: 1500 },
    { id: 2, name: "Chlef", name_ar: "الشلف", fee: 800 },
    { id: 3, name: "Laghouat", name_ar: "الأغواط", fee: 1200 },
    { id: 4, name: "Oum El Bouaghi", name_ar: "أم البواقي", fee: 1000 },
    { id: 5, name: "Batna", name_ar: "باتنة", fee: 1000 },
    { id: 6, name: "Béjaïa", name_ar: "بجاية", fee: 800 },
    { id: 7, name: "Biskra", name_ar: "بسكرة", fee: 1200 },
    { id: 8, name: "Béchar", name_ar: "بشار", fee: 1800 },
    { id: 9, name: "Blida", name_ar: "البليدة", fee: 500 },
    { id: 10, name: "Bouira", name_ar: "البويرة", fee: 700 },
    { id: 11, name: "Tamanrasset", name_ar: "تمنراست", fee: 2500 },
    { id: 12, name: "Tébessa", name_ar: "تبسة", fee: 1400 },
    { id: 13, name: "Tlemcen", name_ar: "تلمسان", fee: 900 },
    { id: 14, name: "Tiaret", name_ar: "تيارت", fee: 1100 },
    { id: 15, name: "Tizi Ouzou", name_ar: "تيزي وزو", fee: 700 },
    { id: 16, name: "Algiers", name_ar: "الجزائر", fee: 400 },
    { id: 17, name: "Djelfa", name_ar: "الجلفة", fee: 1200 },
    { id: 18, name: "Jijel", name_ar: "جيجل", fee: 800 },
    { id: 19, name: "Sétif", name_ar: "سطيف", fee: 800 },
    { id: 20, name: "Saïda", name_ar: "سعيدة", fee: 1100 },
    { id: 21, name: "Skikda", name_ar: "سكيكدة", fee: 900 },
    { id: 22, name: "Sidi Bel Abbès", name_ar: "سيدي بلعباس", fee: 1000 },
    { id: 23, name: "Annaba", name_ar: "عنابة", fee: 900 },
    { id: 24, name: "Guelma", name_ar: "قالمة", fee: 900 },
    { id: 25, name: "Constantine", name_ar: "قسنطينة", fee: 800 },
    { id: 26, name: "Médéa", name_ar: "المدية", fee: 600 },
    { id: 27, name: "Mostaganem", name_ar: "مستغانم", fee: 800 },
    { id: 28, name: "M'Sila", name_ar: "المسيلة", fee: 1000 },
    { id: 29, name: "Mascara", name_ar: "معسكر", fee: 900 },
    { id: 30, name: "Ouargla", name_ar: "ورقلة", fee: 1600 },
    { id: 31, name: "Oran", name_ar: "وهران", fee: 700 },
    { id: 32, name: "El Bayadh", name_ar: "البيض", fee: 1300 },
    { id: 33, name: "Illizi", name_ar: "إليزي", fee: 2200 },
    { id: 34, name: "Bordj Bou Arreridj", name_ar: "برج بوعريريج", fee: 900 },
    { id: 35, name: "Boumerdès", name_ar: "بومرداس", fee: 500 },
    { id: 36, name: "El Tarf", name_ar: "الطارف", fee: 1000 },
    { id: 37, name: "Tindouf", name_ar: "تندوف", fee: 2800 },
    { id: 38, name: "Tissemsilt", name_ar: "تيسمسيلت", fee: 900 },
    { id: 39, name: "El Oued", name_ar: "الوادي", fee: 1400 },
    { id: 40, name: "Khenchela", name_ar: "خنشلة", fee: 1100 },
    { id: 41, name: "Souk Ahras", name_ar: "سوق أهراس", fee: 1200 },
    { id: 42, name: "Tipaza", name_ar: "تيبازة", fee: 500 },
    { id: 43, name: "Mila", name_ar: "ميلة", fee: 800 },
    { id: 44, name: "Aïn Defla", name_ar: "عين الدفلى", fee: 700 },
    { id: 45, name: "Naâma", name_ar: "النعامة", fee: 1400 },
    { id: 46, name: "Aïn Témouchent", name_ar: "عين تموشنت", fee: 1000 },
    { id: 47, name: "Ghardaïa", name_ar: "غرداية", fee: 1500 },
    { id: 48, name: "Relizane", name_ar: "غليزان", fee: 900 },
    { id: 49, name: "El M'ghair", name_ar: "المغير", fee: 1400 },
    { id: 50, name: "El Menia", name_ar: "المنيعة", fee: 1600 },
    { id: 51, name: "Ouled Djellal", name_ar: "أولاد جلال", fee: 1300 },
    { id: 52, name: "Bordj Badji Mokhtar", name_ar: "برج باجي مختار", fee: 2000 },
    { id: 53, name: "Béni Abbès", name_ar: "بني عباس", fee: 1900 },
    { id: 54, name: "Timimoun", name_ar: "تيميمون", fee: 1700 },
    { id: 55, name: "Touggourt", name_ar: "تقرت", fee: 1400 },
    { id: 56, name: "Djanet", name_ar: "جانت", fee: 2400 },
    { id: 57, name: "In Salah", name_ar: "عين صالح", fee: 2100 },
    { id: 58, name: "In Guezzam", name_ar: "عين قزام", fee: 2800 }
];

const ProductsContext = ({ children }) => {
    const backendUrl = "https://ecom-pro-0qxb.onrender.com";
    const currency = 'DZD'; // Changed from '$' to 'DZD' for Algerian context
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [selectedWilaya, setSelectedWilaya] = useState("");
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const userId = user?.id || null; // Safe access with optional chaining
    const [updatedProduct, setUpdatedProduct] = useState({})


    const navigate = useNavigate();

    const handleWilayaChange = (wilayaId) => {
        setSelectedWilaya(wilayaId);
        const selected = algerianWilayas.find(w => w.id.toString() === wilayaId);
        if (selected) {
            setDeliveryFee(selected.fee);
        }
    };

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Please Select The Size', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    fontSize: 'clamp(12px, 3vw, 16px)',
                    maxWidth: '90vw',
                    margin: '0 auto',
                    width: 'auto',
                },
            });
            return;
        } else {
            toast.success('The Product Have been added to your cart', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    fontSize: 'clamp(12px, 3vw, 16px)',
                    maxWidth: '90vw',
                    margin: '0 auto',
                    width: 'auto',
                },
            });
            setTimeout(() => {
                navigate('/cart');
            }, 3000);
        }

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {

            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user._id;

            try {
                const response = await axios.post(`${backendUrl}/api/cart/add`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                }, { userId, itemId, size },

                )

                if (response.data.success) {
                    setCartItems(response.data.cart); // Update with server's cart
                }
            } catch (error) {
                console.log(error);
                toast.error("Can't Add To Cart!", {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: {
                        fontSize: 'clamp(12px, 3vw, 16px)',
                        maxWidth: '90vw',
                        margin: '0 auto',
                        width: 'auto',
                    },
                });
            }
        }
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user._id;

        if (token) {
            try {
                const response = await axios.put(`${backendUrl}/api/cart/update`, { userId, itemId, size, quantity },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                if (response.data.success) {
                    setCartItems(response.data.cart);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message, {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: {
                        fontSize: 'clamp(12px, 3vw, 16px)',
                        maxWidth: '90vw',
                        margin: '0 auto',
                        width: 'auto',
                    },
                })
            }
        }

    };

    const getUserCart = async (token) => {
        try {
            const response = await axios.get(`${backendUrl}/api/cart/get`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })

            if (response.data.success) {
                setCartItems(response.data.cartData)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const getUserOrders = async () => {
        const response = await axios.get(`${backendUrl}/api/orders/myOrders`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.data.success) {
            setOrders(orders)
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const productId in cartItems) {
            for (const size in cartItems[productId]) {
                totalCount += cartItems[productId][size];
            }
        }
        return totalCount;
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let productInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += (productInfo.price) * (cartItems[items][item]);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
        return totalAmount;
    };

    const getTotalWithDelivery = () => {
        return getCartAmount() + deliveryFee;
    };

    const getProducts = async () => {
        const data = await axios.get(backendUrl + '/api/product/all');
        if (data) {
            setProducts(data.data);
        }
    };

    const updateProduct = async (product, productId) => {
    }

    const getProduct = async (product, productId) => {
        const response = await axios.get(`${backendUrl}/api/product/single/${productId}`)
        setUpdatedProduct(response.data.product);
        navigate('/add');
    }

    // Transform CartItems Object to an Array
    const getCartProductsArray = () => {
        return Object.entries(cartItems).flatMap(([productId, sizes]) =>
            Object.entries(sizes).map(([size, quantity]) => ({
                productId,
                size,
                quantity,
                ...products.find(p => p._id === productId) // Spread product details
            }))
        );
    };

    useEffect(() => {
        getProducts();
    }, []); // Removed products from dependency array to prevent infinite loops

    useEffect(() => {
        const loadCart = async () => {
            if (token) {
                await getUserCart(token);
            }
        }
        loadCart();
    }, [token])


    const value = {
        products,
        currency,
        delivery_fee: deliveryFee, // Now dynamic based on wilaya selection
        selectedWilaya,
        algerianWilayas,
        handleWilayaChange,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        addToCart,
        cartItems,
        setCartItems,
        getCartCount,
        updateQuantity,
        getCartAmount,
        getTotalWithDelivery,
        getProducts,
        backendUrl,
        getCartProductsArray,
        user,
        userId,
        getUserOrders,
        orders,
        setOrders,
        token,
        updatedProduct,
        setUpdatedProduct,
        updateProduct,
        getProduct
    };

    return (
        <productsContext.Provider value={value}>
            {children}
        </productsContext.Provider>
    );
};

export default ProductsContext;
