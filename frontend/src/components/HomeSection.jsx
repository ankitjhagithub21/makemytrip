import { lazy } from "react"

const Searchbar = lazy(()=>import('./Searchbar'))

const HomeSection = () => {
  return (
    <section className="lg:h-[90vh] h-[40vh] w-full">
      <div className="flex h-full w-full relative">
        <div className="absolute top-0 px-5 left-0 h-full w-full flex flex-col  items-center justify-center overlay">
          <h1 className="lg:text-6xl font-serif md:text-4xl mb-5 text-3xl text-white text-center font-semibold">
            Discover story-worthy <br /> travel moments
          </h1>
          <Searchbar />
        </div>
        <div className="lg:w-1/2 w-full">
          <img alt="" src="./1.avif" className="h-full w-full object-cover object-center"/>
        </div>
        <div className="lg:w-1/2 w-full">
          <img alt="" src="./2.avif" className="w-full h-full object-cover object-center" />
        </div>
        <div className="lg:w-1/2 w-full">
          <img alt="" src="./3.avif" className="w-full h-full object-cover object-center" />
        </div>
        
      </div>
    </section>
  )
}

export default HomeSection