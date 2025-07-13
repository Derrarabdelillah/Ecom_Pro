import { assets } from "../assets/frontend_assets/assets";


const Hero = () => {
    const img = assets.hero_img;
    return (
        <>
            <section className="h-[500px]">
                <div className="relative md:top-24 flex flex-col gap-2 md:flex-row justify-center items-center">
                
                <div className=" flex flex-col  md:w-1/2">
                    <div className="flex flex-col gap-2 ">
                        <h1 className="font-bold text-lg uppercase tracking-wide">fashion essentials</h1>
                        <h2 className="font-bold text-4xl ">Upgrade Your Fashion 
                            <span className="text-main"> With Every Click</span> Shop Today! </h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi tempore natus alias vitae soluta, repellendus quam voluptatibus debitis excepturi, distinctio accusantium officiis. Quod ipsa animi cum obcaecati, nisi distinctio ratione.</p>
                    
                        <div className="flex flex-col text-center md:flex-row gap-2">
                            <button className="main-btn">Shop Now</button>
                        </div>
                    </div>
                </div>

                <div className="md:w-1/2">
                    {/* <img src={img} /> */}
                </div>
                
                </div>
            </section>
        </>
    )
}

export default Hero;