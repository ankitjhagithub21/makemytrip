import { useState } from 'react'
import { resetPassword} from '../api/user'
import toast from 'react-hot-toast'
import {useNavigate, useParams} from 'react-router-dom'

const ResetPassword = () => {
  const { token } = useParams();

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(password !== confirmPassword){
      return toast.error("Password and confirm password are not same.")
    }

    setLoading(true)
    try {
      const data = await resetPassword(password, token);
      toast.success(data.message)
     navigate("/")    
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occured.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='auth min-h-screen flex items-center justify-center p-5'>
      <div className='max-w-md rounded-2xl shadow-2xl mx-auto w-full bg-white p-5'>
        <h1 className='text-center mb-3 text-xl font-semibold'>Reset Password</h1>

        <form onSubmit={handleSubmit}>

          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter new password' className='input input-success w-full' />
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' className='input mt-3 input-success w-full' />
          <button disabled={loading} className='btn btn-success mt-3 w-full'>
            {
              loading && <span className="loading loading-spinner"></span>
            }
            Reset</button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword