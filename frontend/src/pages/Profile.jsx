import { MdEdit } from 'react-icons/md'
import UpdateProfile from '../components/UpdateProfile'
import UpdateName from '../components/UpdateName'
import ChangePassword from '../components/ChangePassword'
import { useSelector } from 'react-redux'


const Profile = () => {
   
  const {user} = useSelector(state=>state.user)
    return (
        <section className="py-24 min-h-screen  px-5">
            <UpdateProfile user={user} />
            <UpdateName user={user} />
            <ChangePassword />
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center space-y-4">
                <h1 className="text-3xl font-semibold text-gray-800 text-center">Your Profile</h1>

                {/* Profile Image */}
       
                <div className='relative'>
                    <img
                        src={user.profileImg}
                        alt="Profile"
                        className="rounded-full  w-32 h-32 object-cover border-4 border-success shadow-md"
                    />
                    <button className='btn rounded-full btn-sm absolute bottom-2   right-0' onClick={() => document.getElementById('my_modal_1').showModal()}>
                        <MdEdit />
                    </button>
                </div>



                {/* User Details */}
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 flex items-center justify-center gap-2">
                        <span> {user.fullName}</span>
                        <MdEdit size={20} className='cursor-pointer mt-1' onClick={() => document.getElementById('my_modal_2').showModal()} />
                    </h2>
                    <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <button className='btn btn-success' onClick={() => document.getElementById('my_modal_3').showModal()}>
                    Change Password
                </button>
            </div>
        </section>
    )
}

export default Profile
