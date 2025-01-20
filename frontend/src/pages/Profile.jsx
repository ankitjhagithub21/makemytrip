import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Profile = () => {
    const { user } = useSelector(state => state.user)
    if (!user) {
        return <Navigate to={"/"} />
    }

    return (
        <section className="bg-gray-100 py-8">
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center space-y-4">
                <h1 className="text-3xl font-semibold text-gray-800 text-center">Your Profile</h1>

                {/* Profile Image */}
                <img 
                    src={user.profileImg} 
                    alt="Profile" 
                    className="rounded-full w-32 h-32 object-cover border-4 border-success shadow-md" 
                />
                
                {/* User Details */}
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-800">{user.fullName}</h2>
                    <p className="text-lg text-gray-600">{user.email}</p>
                </div>

                {/* Optional: Add more user details or actions */}
                <div className="mt-6 text-center">
                    {/* Example: Edit Profile Button */}
                    <button className="btn btn-success">
                        Edit Profile
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Profile
