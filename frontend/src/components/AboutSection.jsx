import { FaArrowRight } from 'react-icons/fa'
import { useState } from 'react'

const AboutSection = () => {
    const [index, setIndex] = useState(0)
    const data = [
        "Make a trip request, connect with a local expert, and sit back while our experts craft a custom itinerary based on expertise, exclusivity, and ease. It’s a trip you couldn’t plan yourself, all with 24/7 on-the-ground support.",
        "Who knows better than a local? Elsewhere teams up with a global network of award-winning travel guides. Each and every trip crafted with Elsewhere is unique to you and your travel style.",
        `Accommodation
        Exclusive experiences
        Personalized trip crafting
        On-trip concierge services
        On-the-ground transportation
        Roadbook with local tips and recommendations
        24/7 support
        International flights are not included`

    ]

    return (
       <section className='bg-gray-100'>
         <div className='container mx-auto flex  lg:flex-row px-5 items-center flex-col-reverse gap-10  py-20'>
            <div className='lg:w-2/4 w-full'>
                <img src="https://lonelyplanetstatic.imgix.net/marketing/2024/elsewhere/elsewhereDriver.jpg?fit=crop&auto=format&w=500&h=700&q=75" alt="about" className='w-full  h-[30vh] lg:h-auto object-cover  rounded-2xl shadow-xl' />
            </div>
            <div className='flex flex-col gap-5 lg:p-10 p-0 lg:w-3/4 w-full'>
                <h2 className=" w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#00DF77] via-[#15803D]  to-[#15803D] md:text-5xl lg:pb-4 xl:pb-6 lg:text-5xl">Your dream itinerary,<br /> crafted with you</h2>
                <p>Elsewhere by Lonely Planet connects you with an award-winning local expert to craft your personalized, unforgettable trip.</p>

                <div className='flex overflow-x-scroll no-scrollbar items-center border-b border-gray-400'>
                    <button onClick={() => setIndex(0)} className={`min-w-fit ${index === 0 ? 'font-semibold bg-gray-200' : 'text-gray-500'} outline-none px-4 py-2 lg:w-fit w-full`}>How does it work?</button>
                    <button onClick={() => setIndex(1)} className={`min-w-fit ${index === 1 ? ' font-semibold bg-gray-200' : 'text-gray-500'} outline-none px-4 py-2 lg:w-fit w-full`}>Work for our local experts</button>
                    <button onClick={() => setIndex(2)} className={`min-w-fit ${index === 2 ? 'font-semibold bg-gray-200' : ' text-gray-500'} px-4 py-2 lg:w-fit w-full outline-none`}>What included?</button>
                </div>

                <p>{data[index]}</p>

                <button className='px-6 py-2 bg-green-700 text-white rounded-full w-fit mt-5 text-sm flex items-center gap-4'>
                    Explore Elsewhere
                    <FaArrowRight />
                </button>
            </div>
        </div>
       </section>
    )
}

export default AboutSection