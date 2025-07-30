import { FiArrowRight } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-main/5 to-indigo-600/10 py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-64 -top-64 w-96 h-96 bg-main/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute -left-64 -bottom-64 w-96 h-96 bg-indigo-600/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Elevate Your Style <span className="text-main">Effortlessly</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Discover curated fashion essentials designed for modern living. Quality pieces that complement your lifestyle.
            </p>
            <div className="flex flex-row gap-4">
              <button className=" px-8 py-3 bg-gradient-to-r from-main to-indigo-600 text-white rounded-lg font-medium hover:from-main-dark hover:to-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                Shop Collection <FiArrowRight />
              </button>
              <button className="px-8 py-3 border border-gray-300 bg-white rounded-lg font-medium hover:bg-gray-50 transition-all shadow-sm hover:shadow-md">
                Learn More
              </button>
            </div>

          </div>
          
          <div className="md:w-1/2">
            {/* Abstract placeholder for visual balance */}
            <div className="relative">
              <div className="w-full aspect-square bg-gradient-to-tr from-main/20 to-indigo-600/20 rounded-2xl shadow-inner"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-main/10 rounded-xl rotate-12"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-600/10 rounded-xl -rotate-12"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;