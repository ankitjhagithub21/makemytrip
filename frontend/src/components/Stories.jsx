

const Stories = () => {
    return (
        <section>
            <div className="container mx-auto px-5 mt-10">
                <h2 className='uppercase'>travel stories and news</h2>
                <div className='flex items-end justify-between my-5'>
                    <h1 className='lg:text-5xl font-bold text-2xl'>Explore our latest stories</h1>
                    <div className='lg:flex gap-3 hidden '>
                        <button className='border rounded-full font-bold border-gray-400 text-sm px-4 py-2'>Read more news</button>
                        <button className='border rounded-full font-bold border-gray-400 text-sm px-4 py-2'>Read more articles</button>

                    </div>
                </div>
                <div className='flex flex-wrap lg:mb-20 mb-10'>
                    <div className='lg:w-2/3 w-full relative h-[50vh] lg:h-auto'>
                        <img src="https://lp-cms-production.imgix.net/2025-01/sitski2whistleryeager.jpg?w=780&h=425&fit=crop&auto=format&q=75" alt="" className='rounded-xl w-full h-full object-cover object-center' />
                        <div className="overlay absolute rounded-xl flex flex-col gap-2 items-start justify-end lg:p-10 top-0 p-5 right-0 w-full h-full min-h-fit">
                            <h2 className='text-white text-sm font-bold tracking-wider'>OUTDOORS</h2>
                            <h1 className='lg:text-3xl text-2xl font-semibold text-white'>Behind the trip: skiing Whistler <br /> to find accessible adventure</h1>
                            <p className='text-white lg:text-lg text-xs'>Destination Editor Melissa Yeager heads to Whistler Canada , in search of accessible adventure.</p>
                        </div>
                    </div>
                    <div className='lg:w-1/3 w-full flex flex-col lg:mt-0 mt-10 gap-4'>
                       {
                        [1,2,3].map((num,idx)=>{
                            return  <div className='lg:px-5 p-0 w-full' key={idx}>
                            <div className='flex gap-4 items-center bg-indigo-100 border border-gray-200 hover:shadow-lg cursor-pointer p-5 rounded-xl w-full'>
                                <img src="https://lp-cms-production.imgix.net/2025-02/GettyRF499766822-cropped.jpg?w=140&h=140&fit=crop&auto=format&q=75" alt="" className='w-14 h-14 rounded-xl object-cover object-center' />
                                <div>
                                    <h2 className='text-sm font-bold text-gray-600'>ACTIVITIES</h2>
                                    <p className='text-lg font-semibold'>15 ways to experience vietnam in 2025</p>
                                    <span className='text-xs'>Feb 7, 2025</span>
                                </div>
                            </div>
                        </div>
                        })
                       }
                       
                       

                    </div>
                </div>
                <div className='lg:hidden gap-3 flex w-full items-center my-10 justify-center'>
                    <button className='border rounded-full min-w-fit font-bold border-gray-400 text-sm px-4 w-1/2 py-2'>Read more news</button>
                    <button className='border rounded-full min-w-fit font-bold border-gray-400 text-sm px-4 w-1/2 py-2'>Read more articles</button>

                </div>
            </div>
        </section>
    )
}

export default Stories