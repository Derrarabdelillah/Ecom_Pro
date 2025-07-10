import Button from "./Button";

const Hero = () => {
    return (
        <>
            <section className=" bg-[url('./assets/bg.png')] bg-cover bg-center w-full bg-no-repeat h-[744px]">
                
                <div className="container relative flex flex-col md:top-24">
                    <div className="flex flex-col gap-2 md:w-[50%]">
                        <h1 className="font-bold text-lg uppercase tracking-wide">fashion essentials</h1>
                        <h2 className="font-bold text-4xl ">Upgrade Your Fashion 
                            <span className="text-main"> With Every Click</span> Shop Today! </h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi tempore natus alias vitae soluta, repellendus quam voluptatibus debitis excepturi, distinctio accusantium officiis. Quod ipsa animi cum obcaecati, nisi distinctio ratione.</p>
                    
                        <div className="flex flex-col text-center md:flex-row gap-2">
                            <Button btnName="new arrivals" btnOff="10% Off" background="white" textC="black"/>
                            <Button btnName="hot deals" btnOff="50% Off" background="red-50" textC="white"/>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default Hero;