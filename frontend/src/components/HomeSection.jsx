
const HomeSection = () => {
  return (
    <section>
        <div className="flex relative">
          <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center overlay">
            <h1 className="lg:text-7xl font-serif md:text-4xl text-3xl text-white text-center font-semibold">
              Discover story-worthy <br /> travel moments
            </h1>
          </div>
          <div>
            <img alt="" src="./1.avif" />
          </div>
          <div>
            <img alt="" src="./2.avif" />
          </div>
          <div>
            <img alt="" src="./3.avif" />
          </div>
        </div>
      </section>
  )
}

export default HomeSection