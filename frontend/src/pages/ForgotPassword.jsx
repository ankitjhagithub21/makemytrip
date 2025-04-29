import { useState } from 'react'
import { sendOtp } from '../api/user'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const data = await sendOtp({ email });
            toast.success(data.message)
            setEmail('')
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occured.")
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <div className='auth min-h-screen flex items-center justify-center p-5'>
            <div className='max-w-md rounded-2xl shadow-2xl mx-auto w-full bg-white p-5'>
                <h1 className='text-center mb-3 text-xl font-semibold'>Forgot Password</h1>

                <form onSubmit={handleSubmit}>

                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' className='input input-success w-full' />
                    <button disabled={loading} className='btn btn-success mt-3 w-full'>
                        {
                            loading && <span className="loading loading-spinner"></span>
                        }
                        Send otp</button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword