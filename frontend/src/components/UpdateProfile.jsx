import { useState } from 'react'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { changeProfileImage } from '../api/user'
import { setUser } from '../redux/slices/userSlice'

const UpdateProfile = ({ user }) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [profileImg, setProfileImg] = useState(null)

    const handleUploadImage = async (e) => {
        e.preventDefault();

        if (!profileImg) {
            return toast.error("Please choose an image.")
        }


        const formData = new FormData();
        formData.append('profileImg', profileImg)
       setLoading(true)
        try {
            const res = await changeProfileImage(formData)
            dispatch(setUser({ ...user, profileImg: res.url }))
            toast.success("Profile photo changed.")
            e.target.reset();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-3">Edit profile</h3>

                <form onSubmit={handleUploadImage}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="profileImg" className='font-semibold text-sm'>Change profile photo</label>
                        <div className=''>
                            <input
                                type="file"
                                name="profileImg"
                                onChange={(e) => setProfileImg(e.target.files[0])}
                                className="file-input w-full file-input-success mb-2"
                                id="profileImg"
                                required
                            />
                            <button type="submit" disabled={loading} className="btn btn-success">
                                {loading && <span className="loading loading-spinner "></span>}
                                Change
                            </button>
                        </div>
                    </div>

                </form>

                <div className="modal-action">
                    <form method="dialog">
                        {/* This button closes the modal */}
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default UpdateProfile
