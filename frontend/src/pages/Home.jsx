import Hero from "../components/Hero";
import Categories from "../components/Categories"
import { useState } from "react";
import ProductDisplay from "../components/ProductDisplay";

const Home = () => {

    const [category, setCategory ] = useState("All");

    return (
        <div className="">
            <Hero />
            <Categories category={category} setCategory={setCategory} />
            <ProductDisplay category={category} />
        </div>
    )
};

export default Home;