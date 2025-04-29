import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { changePassword } from '../api/user';
import toast from 'react-hot-toast';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(null)

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const data = await changePassword({ oldPassword, newPassword })
            toast.success(data.message)
            document.getElementById('my_modal_3').close();
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setLoading(false)
        }


    }

    return (
        <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-semibold text-lg mb-3">Change Password</h3>
                {
                    error && <p className="text-red-500 text-sm">{error}</p>
                }
                <form onSubmit={handleChangePassword} className='flex flex-col gap-3 mt-5'>
                    <input type={showPassword ? 'text' : 'password'} value={oldPassword} placeholder='Enter old password' className='input w-full input-success' onChange={(e) => setOldPassword(e.target.value)} required />
                    <input type={showPassword ? 'text' : 'password'} value={newPassword} placeholder='Enter new password' className='input w-full input-success' onChange={(e) => setNewPassword(e.target.value)} required />
                    <span className='flex gap-3 items-center w-fit px-4 py-1 text-sm rounded-full cursor-pointer badge-success' onClick={() => setShowPassword(!showPassword)}>{
                        showPassword ? <>
                            Hide Password
                            <FaEyeSlash />
                        </> : <>
                            Show Password
                            <FaEye />
                        </>
                    }
                    </span>
                    <button className='btn btn-success' disabled={loading} type='submit'>
                        {
                            loading && <span className="loading loading-spinner"></span>
                        }
                        Change</button>
                </form>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default ChangePassword