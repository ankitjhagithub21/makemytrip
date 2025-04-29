import { lazy } from 'react'
import {Link} from 'react-router-dom'
const SocialMedia = lazy(()=>import("./SocialMedia"))

const Footer = () => {
  return (
    <div className='bg-gray-100 '>
      <footer className="footer   px-5 py-10 grid grid-cols-2 container mx-auto">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <Link className="link link-hover" to={"/about"}>About us</Link>
          <Link className="link link-hover" to={"/contact"}>Contact</Link>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <footer className="flex md:flex-row flex-col md:items-center   gap-5 justify-between bg-base-200 text-base-content border-base-300 border-t md:px-10 px-5 py-5">
        <div className="flex items-center gap-2">
          <img src="./vite.svg" alt="logo" width={40}/>
          <p className='text-sm'>
          MakeMyTrip
            <br />
            Developed By <a href="https://ankitjha.vercel.app" target='_blank' className='text-blue-600 underline'>Ankit Jha</a>
          </p>
        </div>
       <div className='md:flex items-center hidden   text-2xl gap-3'>
       <SocialMedia/>
       </div>
      </footer>
    </div>
  )
}

export default Footer