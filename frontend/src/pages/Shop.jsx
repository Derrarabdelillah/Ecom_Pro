import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Item from "../components/Item";

const Shop = () => {
    const { all_products } = useContext(ShopContext);

    return (
        <div className="container">
            <h2 className="text-4xl font-bold">Our Great Products</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
                {all_products.map( (product) => {
                    
                        return (
                                <div key={product._id} className="rounded-lg  bg-white">
                                    <Item product={product} />
                                </div>
                        )

                } )}
            </div>
        </div>
    )
};

export default Shop;