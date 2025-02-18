import { Link } from "react-router-dom"


const Destinations = () => {
    const places = [
        {
            id: 1,
            imageUrl: "https://lp-cms-production.imgix.net/2021-05/shutterstock_1577265994.jpg?fit=crop&w=360&ar=1%3A1&auto=format&q=75",
            title: "Nevada",

        },
        {
            id: 2,
            imageUrl: "https://lp-cms-production.imgix.net/2020-12/LPT0717_078.jpg?fit=crop&w=360&ar=1%3A1&auto=format&q=75",
            title: "Canary Islands",

        },
        {
            id: 3,
            imageUrl: "https://lp-cms-production.imgix.net/2021-10/TNZ%20-%20Space%20-%20Moke%20Lake%20-%20F6A7236.jpg?fit=crop&w=360&ar=1%3A1&auto=format&q=75",
            title: "New Zealand",

        },


    ]
    return (
        <section>
            <div className='container mx-auto  lg:py-24 py-12'>
                <div className='px-5'>
                    <span className='text-gray-600 font-semibold'>PLAN YOUR TRIP</span>
                    <div className='flex flex-wrap gap-5 items-center justify-between'>
                        <h1 className='lg:text-5xl text-4xl mt-1  font-semibold'>Where to next?</h1>
                        <Link to={"/places"} className='border border-gray-400 transition lg:block hidden font-semibold rounded-full px-6 hover:text-white  py-2 hover:bg-green-600 text-sm'>View all destinations</Link>
                    </div>
                </div>
                <div className="flex lg:flex-wrap md:flex-wrap no-scrollbar flex-nowrap overflow-x-auto lg:justify-between md:justify-between lg:mt-10 mt-5">
                    {places.map((place) => (
                        <div
                            key={place.id}
                            className="lg:w-1/3 md:w-1/2 w-full min-w-[90%] md:min-w-[48%] lg:min-w-[30%] p-5"
                        >
                            <div>
                                <div className="rounded-xl overflow-hidden">
                                    <img
                                        src={place.imageUrl}
                                        alt={place.title}
                                        className="w-full h-full object-cover object-center hover:scale-105 transition cursor-pointer"
                                    />
                                </div>
                                <p className="mt-3 font-semibold lg:text-2xl text-xl">{place.title}</p>
                            </div>
                        </div>
                    ))}
                </div>


              <div className="text-center">
              <Link to={"/places"} className='border  border-gray-400 transition   inline-block mx-auto my-5 lg:hidden font-semibold rounded-full px-6 hover:text-white  py-2 hover:bg-green-800 text-sm'>View all destinations</Link>
              </div>
            </div>
        </section>
    )
}

export default Destinations