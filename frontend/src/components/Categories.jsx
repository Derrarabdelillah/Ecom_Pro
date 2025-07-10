import { categories } from "../assets/data";

const Categories = ({category, setCategory}) => {
    return (
        <>
            <div className="container flex flex-col md:flex-row justify-center gap-4">
                {categories.map( (item) => {
                    return (
                        <div
                        onClick={ () => setCategory(prev => prev === item.name ? "All" : item.name) }
                        id={item.name}
                        key={item.name}
                        className={`flex flex-col gap-2 px-32 py-10  items-center justify-center ${category === item.name ? "bg-main" : "bg-gray-200"} rounded-lg cursor-pointer md:w-1/4 hover:scale-101 hover:bg-main`}>
                            <img src={item.image} width={44} height={44} alt="Categories" />
                            <h4 className="font-bold text-lg">{item.name}</h4>
                        </div>
                    )
                } )}  
            </div>
        </>
    )
}

export default Categories;