import React from 'react'
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa'; // Importing icons from React Icons

const About = () => {
  return (
    <section className='auth py-20 px-5'>
<div className="max-w-6xl  mx-auto bg-white px-5 py-12 rounded-2xl shadow-2xl w-full">
      <div className="text-center mb-8">
        <h1 className="lg:text-4xl text-2xl font-bold text-gray-800 mb-4">About this Project</h1>
        <p className="text-lg text-gray-600">
          This is a travel website built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to explore various travel destinations, share their experiences, and interact with the platform in various ways.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Features</h2>
        <ul className="list-disc list-inside text-lg text-gray-600">
          <li>Signup, Login, and Logout functionality with validation</li>
          <li>Admins can create, delete, and update places</li>
          <li>Users can rate and review any place, as well as delete their review</li>
          <li>Users can view a list of available places</li>
          <li>Users can view detailed information about each place</li>
        </ul>
      </div>

      <div className="text-center mt-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">About the Creator</h3>
        <p className="text-lg text-gray-600 mb-4">This project was created by Ankit Jha, a passionate developer striving to build impactful and user-friendly web applications.</p>
        
        <div className="flex justify-center space-x-6 text-3xl text-gray-600">
          {/* GitHub Icon */}
          <a href="https://github.com/ankitjhagithub21" target="_blank" rel="noopener noreferrer">
            <FaGithub className="hover:text-black" />
          </a>
          
          {/* LinkedIn Icon */}
          <a href="https://www.linkedin.com/in/ankitjha3731" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="hover:text-blue-700" />
          </a>

          {/* Twitter Icon */}
          <a href="https://facebook.com/ankitjha2018" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="hover:text-blue-400" />
          </a>
        </div>
      </div>
    </div>
    </section>
  )
}

export default About;
