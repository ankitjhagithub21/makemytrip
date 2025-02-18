import { FaMailBulk } from "react-icons/fa"

const Form = () => {
  return (
    <section className="py-10 px-5 mb-10">
       <div className="max-w-3xl mx-auto w-full">
       <div className="bg-gray-200 rounded-full w-fit mx-auto p-5 mb-8">
       <FaMailBulk size={30} color="green"/>
       </div>
       <h1 className="lg:text-5xl text-2xl text-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00DF77] via-[#15803D]  to-[#15803D]">Travel inspiration delivered directly to your inbox</h1>
       <div className="flex md:flex-row flex-col gap-2 px-5 items-center justify-center mt-8 mb-5">
        <input type="text" placeholder="Email address" className="border lg:w-1/2 w-full rounded-full border-gray-400 bg-[#FFFFFF] px-4 py-2 outline-green-700" />
        <button className="text-white text-sm px-6 py-2 bg-green-600 hover:bg-green-700 rounded-full md:w-fit w-full">Subscribe now</button>
       </div>
       <p className="text-xs text-center">Subscribe to our newsletters and promotions. Read our Privacy Policy.</p>
       </div>
    </section>
  )
}

export default Form