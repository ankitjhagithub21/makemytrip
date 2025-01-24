import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { changeProfileImage, deleteProfileImage } from '../api/user'
import { setUser } from '../redux/slices/userSlice'

const UpdateProfile = () => {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [profileImg, setProfileImg] = useState(null)
    const [profilePreview, setProfilePreview] = useState(user.profileImg);

    useEffect(() => {
        return () => {
            if (profilePreview && profilePreview !== user.profileImg) {
                URL.revokeObjectURL(profilePreview);
            }
        };
    }, [profilePreview, user.profileImg]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImg(file);
            setProfilePreview(URL.createObjectURL(file)); // Set preview for uploaded file
        }
    };

    const handleUploadImage = async () => {
        if (!profileImg) {
            return toast.error("Please choose an image.");
        }

        const formData = new FormData();
        formData.append('profileImg', profileImg)
        setLoading(true)
        try {
            const res = await changeProfileImage(formData)
            dispatch(setUser({ ...user, profileImg: res.url }))
            toast.success("Profile photo changed.");
            document.getElementById('my_modal_1').close()
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const handleRemoveImage = async () => {
        try {
            const res = await deleteProfileImage();
            dispatch(setUser({ ...user, profileImg: res.url }))
            toast.success(res.message);
            setProfilePreview(null)
            document.getElementById('my_modal_1').close()
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-3">Edit profile</h3>

                <div className=' w-28 h-28 rounded-full mx-auto overflow-hidden flex items-center justify-center'>
                    <label htmlFor="profileImg">
                        {profilePreview ? (
                            <img
                                src={profilePreview}
                                alt="Profile Preview"
                                className="w-full h-full object-cover cursor-pointer"
                            />
                        ) : (
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                alt="Profile Preview"
                                className="w-full h-full object-cover cursor-pointer"
                            />
                        )}
                    </label>
                    <input
                        type="file"
                        name="profileImg"
                        id="profileImg"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>

                <div className='flex gap-3 items-center justify-center  mt-5'>
                    <button onClick={handleUploadImage} disabled={loading} className="btn btn-info btn-sm">
                        {loading && <span className="loading loading-spinner "></span>}
                        Change Photo
                    </button>
                    <button onClick={handleRemoveImage} disabled={loading} className=" btn hover:bg-red-800 btn-sm bg-red-600 text-white">
                        Remove Photo
                    </button>
                </div>

                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default UpdateProfile;
