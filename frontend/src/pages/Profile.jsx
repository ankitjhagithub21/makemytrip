import { MdEdit } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { lazy } from 'react';
const UpdateProfile = lazy(() => import('../components/UpdateProfile'));
const UpdateName = lazy(() => import('../components/UpdateName'));
const ChangePassword = lazy(() => import('../components/ChangePassword'));
const LikedPlaces = lazy(() => import('../components/LikedPlaces'));
const Bookings = lazy(() => import('./Bookings'));

const Profile = () => {
   
  const {user} = useSelector(state=>state.user)
    return (
        <section className="min-h-screen py-10 px-5">
            <UpdateProfile user={user} />
            <UpdateName user={user} />
            <ChangePassword />
            <div className="p-5  w-full max-w-6xl mx-auto my-10  bg-white rounded-lg shadow-lg flex flex-col md:flex-row items-center space-y-4">
              

                {/* Profile Image */}
       
                <div className='relative'>
                    <img
                        src={user.profileImg}
                        alt="Profile"
                        className="rounded-full w-[200px] h-[200px] object-cover border-4 border-success shadow-md"
                    />
                    <button className='btn rounded-full btn-sm btn-success absolute bottom-5   right-0' onClick={() => document.getElementById('my_modal_1').showModal()}>
                        <MdEdit />
                    </button>
                </div>



                {/* User Details */}
                <div className="text-center flex flex-col md:items-start items-center gap-3 p-5">
                   
                    <h2 className="text-2xl font-semibold text-gray-800 flex items-center justify-center gap-2">
                        <span> {user.fullName}</span>
                        <MdEdit size={20} className='cursor-pointer mt-1' onClick={() => document.getElementById('my_modal_2').showModal()} />
                    </h2>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <button className='underline text-sm text-blue-600' onClick={() => document.getElementById('my_modal_3').showModal()}>
                    Change Password
                </button>
                </div>
               
            </div>
            <LikedPlaces/>
            <Bookings/>
        </section>
    )
}

export default Profile
