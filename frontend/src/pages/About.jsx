import { lazy } from 'react';

const SocialMedia = lazy(() => import('../components/SocialMedia'));

const About = () => {
  return (
    <section className="py-20 px-5">
      <div className="max-w-6xl mx-auto border rounded-xl px-5 py-12 w-full">
        <div className="text-center mb-8">
          <h1 className="lg:text-4xl text-2xl font-bold text-gray-800 mb-4">About This Project</h1>
          <p className="text-lg text-gray-600">
            This is a travel website built using the MERN stack (MongoDB, Express, React, and Node.js). It allows users to explore various travel destinations, share their experiences, and interact with the platform in multiple ways.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Key Features</h2>
          <ul className="list-disc list-inside text-lg text-gray-600">
            <li><strong>User Authentication:</strong> Signup, login, and logout functionality with form validation to ensure accurate user input.</li>
            <li><strong>Password Reset:</strong> Users can reset their passwords securely if they forget their login credentials.</li>
            <li><strong>Admin Management:</strong> Admins have the ability to create, update, and delete travel destinations and hotels.</li>
            <li><strong>Hotel Booking:</strong> Users can book hotels and view a list of their bookings for easy tracking.</li>
            <li><strong>Search Functionality:</strong> Users can search for destinations by name, location, or country to find places of interest quickly.</li>
            <li><strong>Ratings and Reviews:</strong> Users can rate and review destinations. They also have the option to edit or delete their reviews.</li>
            <li><strong>Place Listings:</strong> Users can browse a list of available travel destinations with detailed information for each place.</li>
            <li><strong>Profile Management:</strong> Users can update their profile picture, name, and password for a personalized experience.</li>
            <li><strong>Favorites:</strong> Users can add destinations to their favorites list for easy access and remove them if desired.</li>
            <li><strong>Wishlist:</strong> Users can add places to their wishlist for future travel plans.</li>
            <li><strong>Protected Routes:</strong> Both user and admin routes are protected to ensure secure access based on roles.</li>
          </ul>
        </div>

        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">About the Creator</h3>
          <p className="text-lg text-gray-600 mb-4">
            This project was created by Ankit Jha, a passionate developer dedicated to building impactful and user-friendly web applications.
          </p>
          <div className="flex justify-center space-x-6 text-3xl text-gray-600">
            <SocialMedia />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
